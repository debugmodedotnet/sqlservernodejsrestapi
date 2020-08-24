import { WebResource, HttpClient } from "@azure/ms-rest-js";
import { TokenClientCredentials, TokenResponse } from "./tokenClientCredentials";
/**
 * @interface MSIOptions Defines the optional parameters for authentication with MSI.
 */
export interface MSIOptions {
    /**
     * @prop {string} [resource] -  The resource uri or token audience for which the token is needed.
     * For e.g. it can be:
     * - resourcemanagement endpoint "https://management.azure.com/" (default)
     * - management endpoint "https://management.core.windows.net/"
     */
    resource?: string;
    /**
     * @property {HttpClient} [httpClient] - The client responsible for sending HTTP requests.
     * By default it is Axios-based {@link DefaultHttpClient}.
     */
    httpClient?: HttpClient;
}
/**
 * @interface MSITokenResponse - Describes the MSITokenResponse.
 */
export interface MSITokenResponse extends TokenResponse {
    /**
     * @property {any} any - Placeholder for unknown properties.
     */
    readonly [x: string]: any;
}
/**
 * @class MSITokenCredentials - Provides information about managed service identity token credentials.
 * This object can only be used to acquire token on a virtual machine provisioned in Azure with managed service identity.
 */
export declare abstract class MSITokenCredentials implements TokenClientCredentials {
    resource: string;
    protected _httpClient: HttpClient;
    /**
     * Creates an instance of MSITokenCredentials.
     * @param {object} [options] - Optional parameters
     * @param {string} [options.resource] - The resource uri or token audience for which the token is needed.
     * For e.g. it can be:
     * - resource management endpoint "https://management.azure.com/"(default)
     * - management endpoint "https://management.core.windows.net/"
     */
    constructor(options: MSIOptions);
    /**
     * Parses a tokenResponse json string into a object, and converts properties on the first level to camelCase.
     * This method tries to standardize the tokenResponse
     * @param  {string} body  A json string
     * @return {object} [tokenResponse] The tokenResponse (tokenType and accessToken are the two important properties).
     */
    parseTokenResponse(body: string): TokenResponse;
    /**
     * Prepares and sends a POST request to a service endpoint hosted on the Azure VM, which responds with the access token.
     * @param  {function} callback  The callback in the form (err, result)
     * @return {Promise<MSITokenResponse>} Promise with the token response.
     */
    abstract getToken(): Promise<MSITokenResponse>;
    protected abstract prepareRequestOptions(): WebResource;
    /**
     * Signs a request with the Authentication header.
     *
     * @param {webResource} The WebResource to be signed.
     * @return {Promise<WebResource>} Promise with signed WebResource.
     */
    signRequest(webResource: WebResource): Promise<WebResource>;
}
//# sourceMappingURL=msiTokenCredentials.d.ts.map