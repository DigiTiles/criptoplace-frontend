export const environment = {
  production: true,
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
