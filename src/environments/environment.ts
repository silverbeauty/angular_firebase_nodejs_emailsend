// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //api_url: 'https://us-central1-mailing-dev-80dc9.cloudfunctions.net',
  api_url: 'http://localhost:5000/mailing-dev-80dc9/us-central1',
  socket_url: 'http://localhost:8989',
  website: 'http://localhost:4200',
  app_name: 'mailing-dev',
  valid_api: 'https://api.zerobounce.net/v2/validate?api_key=58c87fd1305f4eaba5a33feb8a220f69',
  sendgrid_key: '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',
  sendgrid_url: 'https://api.sendgrid.com/api/mail.send.json',
  firebase: {
    apiKey: "AIzaSyBi4PwDKkKA2oajZD2zjsRF7vn-GOmIrBY",
    authDomain: "mailing-dev-80dc9.firebaseapp.com",
    databaseURL: "https://mailing-dev-80dc9.firebaseio.com",
    projectId: "mailing-dev-80dc9",
    storageBucket: "mailing-dev-80dc9.appspot.com",
    messagingSenderId: "581721289629"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
