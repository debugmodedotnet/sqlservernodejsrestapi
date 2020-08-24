import { TokenCredentialsBase } from "./tokenCredentialsBase";
import { Environment } from "@azure/ms-rest-azure-env";
import { TokenAudience } from "../util/authConstants";
import { TokenResponse, TokenCache } from "adal-node";
export declare class UserTokenCredentials extends TokenCredentialsBase {
    readonly username: string;
    readonly password: string;
    /**
     * Creates a new UserTokenCredentials object.
     *
     * @constructor
     * @param {string} clientId The active directory application client id.
     * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
     * for an example.
     * @param {string} domain The domain or tenant id containing this application.
     * @param {string} username The user name for the Organization Id account.
     * @param {string} password The password for the Organization Id account.
     * @param {string} [tokenAudience] The audience for which the token is requested. Valid values are 'graph', 'batch', or any other resource like 'https://vault.azure.net/'.
     * If tokenAudience is 'graph' then domain should also be provided and its value should not be the default 'common' tenant. It must be a string (preferrably in a guid format).
     * @param {Environment} [environment] The azure environment to authenticate with.
     * @param {object} [tokenCache] The token cache. Default value is the MemoryCache object from adal.
     */
    constructor(clientId: string, domain: string, username: string, password: string, tokenAudience?: TokenAudience, environment?: Environment, tokenCache?: TokenCache);
    private crossCheckUserNameWithToken;
    /**
     * Tries to get the token from cache initially. If that is unsuccessful then it tries to get the token from ADAL.
     * @returns {Promise<TokenResponse>}
     * {object} [tokenResponse] The tokenResponse (tokenType and accessToken are the two important properties).
     * @memberof UserTokenCredentials
     */
    getToken(): Promise<TokenResponse>;
}
//# sourceMappingURL=userTokenCredentials.d.ts.map