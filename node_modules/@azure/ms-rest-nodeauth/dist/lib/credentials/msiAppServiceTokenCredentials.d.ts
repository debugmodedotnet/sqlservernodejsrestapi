import { MSITokenCredentials, MSIOptions, MSITokenResponse } from "./msiTokenCredentials";
import { WebResource } from "@azure/ms-rest-js";
/**
 * @interface MSIAppServiceOptions Defines the optional parameters for authentication with MSI for AppService.
 */
export interface MSIAppServiceOptions extends MSIOptions {
    /**
     * @property {string} [msiEndpoint] - The local URL from which your app can request tokens.
     * Either provide this parameter or set the environment variable `MSI_ENDPOINT`.
     * For example: `export MSI_ENDPOINT="http://127.0.0.1:41741/MSI/token/"`
     */
    msiEndpoint?: string;
    /**
     * @property {string} [msiSecret] - The secret used in communication between your code and the local MSI agent.
     * Either provide this parameter or set the environment variable `MSI_SECRET`.
     * For example: `export MSI_SECRET="69418689F1E342DD946CB82994CDA3CB"`
     */
    msiSecret?: string;
    /**
     * @property {string} [msiApiVersion] - The api-version of the local MSI agent. Default value is "2017-09-01".
     */
    msiApiVersion?: string;
}
/**
 * @class MSIAppServiceTokenCredentials
 */
export declare class MSIAppServiceTokenCredentials extends MSITokenCredentials {
    /**
     * @property {string} msiEndpoint - The local URL from which your app can request tokens.
     * Either provide this parameter or set the environment variable `MSI_ENDPOINT`.
     * For example: `MSI_ENDPOINT="http://127.0.0.1:41741/MSI/token/"`
     */
    msiEndpoint: string;
    /**
     * @property {string} msiSecret - The secret used in communication between your code and the local MSI agent.
     * Either provide this parameter or set the environment variable `MSI_SECRET`.
     * For example: `MSI_SECRET="69418689F1E342DD946CB82994CDA3CB"`
     */
    msiSecret: string;
    /**
     * @property {string} [msiApiVersion] The api-version of the local MSI agent. Default value is "2017-09-01".
     */
    msiApiVersion?: string;
    /**
     * Creates an instance of MSIAppServiceTokenCredentials.
     * @param {string} [options.msiEndpoint] - The local URL from which your app can request tokens.
     * Either provide this parameter or set the environment variable `MSI_ENDPOINT`.
     * For example: `MSI_ENDPOINT="http://127.0.0.1:41741/MSI/token/"`
     * @param {string} [options.msiSecret] - The secret used in communication between your code and the local MSI agent.
     * Either provide this parameter or set the environment variable `MSI_SECRET`.
     * For example: `MSI_SECRET="69418689F1E342DD946CB82994CDA3CB"`
     * @param {string} [options.resource] - The resource uri or token audience for which the token is needed.
     * For e.g. it can be:
     * - resource management endpoint "https://management.azure.com/" (default)
     * - management endpoint "https://management.core.windows.net/"
     * @param {string} [options.msiApiVersion] - The api-version of the local MSI agent. Default value is "2017-09-01".
     */
    constructor(options?: MSIAppServiceOptions);
    /**
     * Prepares and sends a GET request to a service endpoint indicated by the app service, which responds with the access token.
     * @return {Promise<MSITokenResponse>} Promise with the tokenResponse (tokenType and accessToken are the two important properties).
     */
    getToken(): Promise<MSITokenResponse>;
    protected prepareRequestOptions(): WebResource;
}
//# sourceMappingURL=msiAppServiceTokenCredentials.d.ts.map