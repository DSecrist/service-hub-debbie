# service-hub
> A hub for an automotive dealer's service offers with a streamlined call to action to schedule an appointment for automotive service.
## Installation
```bash
npm install
```
## Unit Testing
```bash
npm run test:unit
```
## Local Development
To start the development environment locally:
```bash
npm run serve
```
### Dealer Settings
When running the application locally the dealer settings are dowloaded from static files located in directory `/static/dealer_test_data`.

To access the application and load one of the dealer test files use the dealer_id query string variable.  Example below (assumes the local environment is running on port 8080) loads the `max.test2` dealer settings file:

* [http://localhost:8080/?dealer_id=max.test2](http://localhost:8080/?dealer_id=max.test2)

### Appointment Scheduling
When running the application in development mode, no API calls are made to schedule appointments.  The appointment data is simply output to the console.

## Local Development Pointed To Staging
It is possible to develop locally and point to staging APIs for retrieving dealer settings and scheduling appointments.

To start the development environment locally in staging mode:
```bash
npm run serve:staging
```
### Dealer Settings
In this mode dealer settings are pulled from the API.  In this mode, the dealer settings are either pulled based on the hostname or dealer_id query string variable.

Below are a couple of example URLs that load valid dealer settings from the API (assumes the local environment is running on port 8080):

* [http://localhost:8080/?dealer_id=max.test](http://localhost:8080/?dealer_id=max.test)
* [http://localhost:8080/?dealer_id=northwest.test](http://localhost:8080/?dealer_id=northwest.test)

### Appointment Scheduling
When running the application in staging mode, the API is called to schedule the appointments.

## Guides

* [Environments](/docs/environments.md)
* [Analytics Tracking](/docs/analytics-tracking.md)
