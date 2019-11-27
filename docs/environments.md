## Environments
Supported enviroments are test, development, staging, and production.
### Testing
Unit teests are run continuously watching for changes to source code and then automatically running again.
```bash
npm run test:unit
```
Testing utilizes the `.env.test` environment file.
### Development 
### Environment Variables
|Variable|Value|Description|
|--------|-----|-----------|
|NODE_ENV|test, development, staging, production|Defines the build mode for the application.|
|VUE_APP_MODE|test, development, staging, production|A runtime variable that is used to change behavior, like the logging level, based on the runtime app mode.|
|VUE_APP_SERVICE_BASE_URL|empty or base url including protocol|The base url for the dealer settings API and appointment API.  If empty then data is pulled locally appointment setting data is output to the console.
|VUE_APP_USE_RECAPTCHA_TOKEN|yes, no|Doe we need to get a recapcha token before calling the service APIs.
|VUE_APP_TITLE|string|Used as the html title for the page.  Used to easily know if you are running the app in development or staging or production.|
|VUE_APP_GA_SEND_EVENTS|yes or no|Whether to send events to Google Analytics.|
|VUE_APP_BRAND_STATIC_DATA|empty or base url|This is the base url for downloading static content.  This is empty for most enviroments since static data is just releative to the application host.|
