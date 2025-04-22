export const environment = {
  production: true,
  smartContractChainId: 97,
  smartContractAddress: '0xE1D4A21B63CAd86B6A36828341a800546223A32d',
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
