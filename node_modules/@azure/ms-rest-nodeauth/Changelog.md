# Changelog
## 2.0.2 - 2019/06/13
 - Ensure we always get JSON responses back from Azure CLI.

## 2.0.1 - 2019/05/22
 - Get subscriptions while authenticating only if the token audience is for Azure Resource Manager.

## 2.0.0 - 2019/05/20
- Added support for client_id, object_id and ms_res_id query parameters for VmMSI. Fixes [#58](https://github.com/Azure/ms-rest-nodeauth/issues/58).
- **Breaking change:** 
  - Added support to get token for a different resource like Azure Keyvault, Azure Batch, Azure Graph apart from the default Azure Resource Manager resource via `AzureCliCredentials`.
  - `AzureCliCredentials.create()` now takes an optional parameter where the user can specify the subscriptionId and the resource for which the token is required.
  - `AzureCliCredentials.getDefaultSubscription()` has been changed to `AzureCliCredentials.getSubscription(subscriptionIdOrName?: string)`.

## 1.1.1 - 2019/05/16
- Minor updates

## 1.1.0 - 2019/05/16
- Added support to get credentials from `Azure CLI`, provided the user is already logged in via CLI.
These credentials can be used by the SDK to make requests to Azure. Fixes,
- [azure-sdk-for-js/issues/2810](https://github.com/Azure/azure-sdk-for-js/issues/2810)
- [azure-sdk-for-node/issues/2284](https://github.com/Azure/azure-sdk-for-node/issues/2284).

## 1.0.1 - 2019/05/06
- Update README.md
- Fix repository url in package.json

## 1.0.0 - 2019/05/06
- Added support for ServicePrincipal login with certificates.
- Updated dependencies to their latest versions.

## 0.9.3 - 2019/04/04
- Updated `@azure/ms-rest-js` to the latest version `^1.8.1`.

## 0.9.2 - 2019/03/26
- Updated the return types  for calls using interactive login, user name/ password and service principal to return the right types with promise flavor methods.

## 0.9.1 - 2019/01/15
- Fixed issues in AppService MSI login.
- Improved documentation of `MSIAppServiceTokenCredentials.getToken()`
## 0.9.0 - 2019/01/11
- Added support for custom MSI endpoint.

## 0.8.4 - 2019/01/09
- Exported MSI login methods from the package.

## 0.8.3 - 2018/12/18
- Added a check for verifying the package.json version
- Added azure pipelines for CI.

## 0.8.2 - 2018/11/19
- Fixed incorrect path in the "main" node of package.json.

## 0.8.1 - 2018/11/19
- Added owners and issue template.
- Improved internal structure of the package.

## 0.8.0 - 2018/11/12

- Renamed package to "@azure/ms-rest-nodeauth"

## 0.6.0 - 2018/09/27

- Move KeyVaultCredentials into KeyVault SDK project
- Add KeyVaultFactory which helps creating authentication method from various credential types.

## 0.5.3 - 2018/09/19

- Updated documentation

## 0.5.2 - 2018/09/18

- Added KeyVaultCredentials

## 0.5.1 - 2018/09/18

- Added TopicCredentials

## 0.5.0 - 2018/08/16

- Added support for MSI authentication
- Updated ms-rest-js package to 0.19 version
- Updated ms-rest-azure-env package to 0.1.1 version

## 0.4.0 - 2018/08/08

- Updated ms-rest-js package to 0.18 version

## 0.3.0 - 2018/08/06

- Updated ms-rest-js package to 0.17 version

## 0.2.0 - 2018/07/27

- Updated ms-rest-js package to 0.14 version

## 0.1.1 - 2018/08/27

- Domain is no longer a required parameter for MSITokenCredentials.
- Rename LoginWithMSIOptions interface to MSIOptions

## 0.1.0 - 2017/09/16

- Initial version of ms-rest-nodeauth
- Provides following flavors of authentication in different Azure Clouds
  - Authentication via service principal
  - Authentication via username/password
  - Interactive authentication (device code flow)
  - Authentication via auth file
  - MSI (Managed Service Identity) based authentication from a virtual machine created in Azure.
