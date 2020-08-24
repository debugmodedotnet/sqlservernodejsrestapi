// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as msRest from "@azure/ms-rest-js";
import { TokenCredentialsBase } from "../credentials/tokenCredentialsBase";
import { ApplicationTokenCredentialsBase } from "../credentials/applicationTokenCredentialsBase";
import { AuthConstants } from "../util/authConstants";

/**
 * @interface UserType Provides information about user type. It can currently be "user" or "servicePrincipal".
 */
export type UserType = "user" | "servicePrincipal";

/**
 * @interface LinkedUser Provides information about a user from the authentication perspective.
 */
export interface LinkedUser {
  /**
   * @property {string} name - The user name. For ApplicationTokenCredentials it can be the clientId or SPN.
   */
  name: string;
  /**
   * @property {string} type - The user type. "user" | "servicePrincipal".
   */
  type: UserType;
}

/**
 * @interface LinkedSubscription Provides information about subscription that was found
 * during the authentication process. The structure of this type is different from the
 * subscription object that one gets by making a request to the ResourceManager API.
 */
export interface LinkedSubscription {
  /**
   * @property {string} tenantId - The tenant that the subscription belongs to.
   */
  readonly tenantId: string;
  /**
   * @property {string} user - The user associated with the subscription. This could be a user or a serviceprincipal.
   */
  readonly user: LinkedUser;
  /**
   * @property {string} environmentName - The environment name in which the subscription exists.
   * Possible values: "AzureCloud", "AzureChinaCloud", "AzureUSGovernment", "AzureGermanCloud" or
   * some other custom/internal environment name like "Dogfood".
   */
  readonly environmentName: string;
  /**
   * @property {string} name - The display name of the subscription.
   */
  readonly name: string;
  /**
   * @property {string} id - The subscription id, usually a GUID.
   */
  readonly id: string;
  /**
   * @property {string} authorizationSource - The authorization source of the subscription: "RoleBased",
   *  "Legacy", "Bypassed"," Direct", "Management". It could also be a comma separated string containing
   *  more values "Bypassed, Direct, Management".
   */
  readonly authorizationSource: string;
  /**
   * @property {string} state - The state of the subscription. Example values: "Enabled", "Disabled",
   *  "Warned", "PastDue", "Deleted".
   */
  readonly state: string;
  /**
   * @property {any} any Placeholder for unknown properties.
   */
  readonly [x: string]: any;
}

/**
 * Builds an array of tenantIds.
 * @param {TokenCredentialsBase} credentials The credentials.
 * @param {string} apiVersion default value 2016-06-01
 * @returns {Promise<string[]>} resolves to an array of tenantIds and rejects with an error.
 */
export async function buildTenantList(credentials: TokenCredentialsBase, apiVersion = "2016-06-01"): Promise<string[]> {
  if (credentials.domain && credentials.domain !== AuthConstants.AAD_COMMON_TENANT) {
    return Promise.resolve([credentials.domain]);
  }

  const client = new msRest.ServiceClient(credentials);
  const baseUrl = credentials.environment.resourceManagerEndpointUrl;
  const reqUrl = `${baseUrl}${baseUrl.endsWith("/") ? "" : "/"}tenants?api-version=${apiVersion}`;
  const req: msRest.RequestPrepareOptions = {
    url: reqUrl,
    method: "GET",
  };
  let res: msRest.HttpOperationResponse;
  try {
    res = await client.sendRequest(req);
  } catch (err) {
    return Promise.reject(err);
  }
  const result: string[] = [];
  const tenants: any = res.parsedBody;
  for (const tenant in tenants.value) {
    result.push((<any>tenant).tenantId);
  }
  return Promise.resolve(result);
}

export async function getSubscriptionsFromTenants(credentials: TokenCredentialsBase, tenantList: string[], apiVersion = "2016-06-01"): Promise<LinkedSubscription[]> {
  let subscriptions: LinkedSubscription[] = [];
  let userType = "user";
  let username: string;
  const originalDomain = credentials.domain;
  if (credentials instanceof ApplicationTokenCredentialsBase) {
    userType = "servicePrincipal";
    username = credentials.clientId;
  } else {
    username = (<any>credentials).username;
  }
  for (const tenant of tenantList) {
    credentials.domain = tenant;
    const client = new msRest.ServiceClient(credentials);
    const baseUrl = credentials.environment.resourceManagerEndpointUrl;
    const reqUrl = `${baseUrl}${baseUrl.endsWith("/") ? "" : "/"}subscriptions?api-version=${apiVersion}`;
    const req: msRest.RequestPrepareOptions = {
      url: reqUrl,
      method: "GET",
    };
    let res: msRest.HttpOperationResponse;
    try {
      res = await client.sendRequest(req);
    } catch (err) {
      return Promise.reject(err);
    }

    const subscriptionList: any[] = (<any>res.parsedBody).value;
    subscriptions = subscriptions.concat(subscriptionList.map((s: any) => {
      s.tenantId = tenant;
      s.user = { name: username, type: userType };
      s.environmentName = credentials.environment.name;
      s.name = s.displayName;
      s.id = s.subscriptionId;
      delete s.displayName;
      delete s.subscriptionId;
      delete s.subscriptionPolicies;
      return s;
    }));
  }
  // Reset the original domain.
  credentials.domain = originalDomain;
  return Promise.resolve(subscriptions);
}