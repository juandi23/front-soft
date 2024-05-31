// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultauth: 'devbackend',
  firebaseConfig: {
    apiKey: "aaaaaaaaaaaaaaaaaaaaaaa",
    authDomain: "xxxxxxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxxx",
    appId: "1:xxxxxxxxxxxxxxx:web:",
    measurementId: "G-xxxxxxxxxxxxxxx",
    vapidKey: "xxxxxxxxxxxxxxx"
  },
  stripePublicKey: 'xxxxxxxxxxxxxxx',
  payu: {
    merchantId: 'xxxxxxxxxxxxxxx',
    accountId: '10xxxxxxxxxxxxxxx12620',
    apiKey: 'xxxxxxxxxxxxxxx'
  },
  api: 'http://localhost:8080/api',
};

  

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
