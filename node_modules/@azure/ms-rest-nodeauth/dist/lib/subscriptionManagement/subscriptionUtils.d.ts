import { TokenCredentialsBase } from "../credentials/tokenCredentialsBase";
/**
 * @interface UserType Provides information about user type. It can currently be "user" or "servicePrincipal".
 */
export declare type UserType = "user" | "servicePrincipal";
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
export declare function buildTenantList(credentials: TokenCredentialsBase, apiVersion?: string): Promise<string[]>;
export declare function getSubscriptionsFromTenants(credentials: TokenCredentialsBase, tenantList: string[], apiVersion?: string): Promise<LinkedSubscription[]>;
//# sourceMappingURL=subscriptionUtils.d.ts.map