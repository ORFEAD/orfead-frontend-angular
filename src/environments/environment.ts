// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  prefillLoginForm: true,
  displayProcessesInfo: true,
  debugBlockUnblockUI:true,
  apiURL: "http://localhost:8085/",
  apiURLForFiles: "http://localhost:8086/",
  numberOfSecondsBetweenRefreshOfMessages: 120,
  numberOfSecondsBetweenChecksOfVersion: 120,
  frontEndVersion:"2020-07-27.01",
  jwt_name: "orfead_jwt",
  defaultNumberOfResults:50,
  numberOfResultsForDeals: 50,
  numberOfResultsForDesigns: 25,
  numberOfResultsForForumMessages: 40,
  numberOfResultsForDashboard:10,
  hideTrademarksModule:true,
  hideSalesReportsModule:false,
  maxFileSizeInMByteForRasterImages:1,
  maxFileSizeInMByteForOtherFiles:1,
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
