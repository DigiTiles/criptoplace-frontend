// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  smartContractChainId: 3,
  smartContractAddress: '0x61c7230977b55DfaB8363E68F9536B88443af98F',
  smartContractABI: [
    {
      inputs: [
        {
          name: "x",
          type: "int256",
        },
        {
          name: "y",
          type: "int256",
        },
        {
          name: "image",
          type: "string",
        }
      ],
      name: "updateTile",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
