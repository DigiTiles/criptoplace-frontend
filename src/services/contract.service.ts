import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private contract: ethers.Contract | null = null;
  private provider: ethers.providers.Web3Provider | null = null;
  private signer: ethers.Signer | null = null;
  private contractAddress = '0x3C27c4100dbC3Ee94Eb3600610b0e7A4a6acCf0D';
  private abi = [
    {
      inputs: [
        {"internalType": "int256", "name": "_x", "type": "int256"},
        {"internalType": "int256", "name": "_y", "type": "int256"},
        {"internalType": "address", "name": "owner", "type": "address"}
      ],
      name: "getPrice",
      outputs: [
        {"internalType": "uint256", "name": "", "type": "uint256"}
      ],
      stateMutability: "pure",
      type: "function"
    },
    {
      inputs: [
        { "internalType": "int256", "name": "_x", "type": "int256" },
        { "internalType": "int256", "name": "_y", "type": "int256" }
      ],
      name: "buy",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [
        { "internalType": "int256", "name": "_x", "type": "int256" },
        { "internalType": "int256", "name": "_y", "type": "int256" }
      ],
      name: "getTileInfo",
      outputs: [
        {
          internalType: "struct Tile",
          name: "",
          type: "tuple",
          components: [
            { "name": "owner", "type": "address" },
            { "name": "rentedBy", "type": "address" },
            { "name": "price", "type": "uint256" },
            { "name": "rentPrice", "type": "uint256" },
            { "name": "minRentPeriod", "type": "uint256" },
            { "name": "maxRentPeriod", "type": "uint256" },
            { "name": "rentedUntil", "type": "uint256" },
            { "name": "availableForRent", "type": "bool" },
            { "name": "availableForSale", "type": "bool" },
            { "name": "image", "type": "string" },
            { "name": "lastAction", "type": "string" },
            { "name": "timeAction", "type": "uint256" }
          ]
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        { "internalType": "int256", "name": "_x", "type": "int256" },
        { "internalType": "int256", "name": "_y", "type": "int256" },
        { "internalType": "string", "name": "image", "type": "string" }
      ],
      name: "setTileImage",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { "internalType": "int256", "name": "_x", "type": "int256" },
        { "internalType": "int256", "name": "_y", "type": "int256" },
        { "internalType": "bool", "name": "_availableForRent", "type": "bool" },
        { "internalType": "uint256", "name": "_rentPrice", "type": "uint256" },
        { "internalType": "uint256", "name": "_minRentPeriod", "type": "uint256" },
        { "internalType": "uint256", "name": "_maxRentPeriod", "type": "uint256" }
      ],
      name: "setRentStatus",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { "internalType": "int256", "name": "_x", "type": "int256" },
        { "internalType": "int256", "name": "_y", "type": "int256" },
        { "internalType": "bool", "name": "_availableForSale", "type": "bool" },
        { "internalType": "uint256", "name": "_salePrice", "type": "uint256" }
      ],
      name: "setSaleStatus",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { "internalType": "int256", "name": "_x", "type": "int256" },
        { "internalType": "int256", "name": "_y", "type": "int256" },
        { "internalType": "uint256", "name": "period", "type": "uint256" }
      ],
      name: "rent",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [
        { "internalType": "address", "name": "_owner", "type": "address" }
      ],
      name: "getTilesOwned",
      outputs: [
        { "components": [
            { "internalType": "int256", "name": "x", "type": "int256" },
            { "internalType": "int256", "name": "y", "type": "int256" }
          ],
          "internalType": "struct Storage.TileCoord[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    }
  ];

  constructor() {}

  async connectWallet() {
    if (!window.ethereum) {
      alert('Install MetaMask!');
      return;
    }

    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    await this.provider.send('eth_requestAccounts', []);
    this.signer = this.provider.getSigner();
    this.contract = new ethers.Contract(this.contractAddress, this.abi, this.signer);
  }

  async getTileInfo(x: number, y: number): Promise<any> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    try {
      const tile = await this.contract.getTileInfo(x, y);
      return {
        owner: tile.owner,
        availableForSale: tile.availableForSale,
        availableForRent: tile.availableForRent,
        price: Number(ethers.utils.formatEther(tile.price)).toString(),
        rentPrice: Number(ethers.utils.formatEther(tile.rentPrice)).toString(),
        minRentPeriod: tile.minRentPeriod.toString(),
        maxRentPeriod: tile.maxRentPeriod.toString(),
        rentedBy: tile.rentedBy,
        rentedUntil: tile.rentedUntil.toString(),
        image: tile.image,
        lastAction: tile.lastAction,
        timeAction: tile.timeAction
      };
    } catch (error) {
      console.error('Error fetching tile info:', error);
      throw error;
    }
  }

  async buy(x: number, y: number): Promise<void> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    try {
    const price = await this.contract.getPrice(x, y, '0x0000000000000000000000000000000000000000');
    await this.contract.buy(x, y, {value: price});
    } catch (error: any) {
      if (error.code === "INSUFFICIENT_FUNDS") {
        alert("Недостаточно средств для выполнения транзакции.");
      } else if (error.code === -32603) {
        alert("Недостаточно средств на счете для оплаты газа и транзакции.");
      } else {
        console.error("Unknown error: ", error);
      }
    }

  }

  async setTileImage(x: number, y: number, image: string): Promise<void> {
    await this.contract?.setTileImage(x, y, image);
  }

  async getTilesByOwner(owner: string): Promise<any[]> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    try {
      const tiles = await this.contract.getTilesOwned(owner);
      return tiles.map((tile: any) => ({
        x: tile.x.toString(),
        y: tile.y.toString(),
      }));
    } catch (error) {
      console.error('Error fetching owned tiles:', error);
      throw error;
    }
  }

  async setRentStatus(x: number, y: number, availableForRent: boolean, rentPrice: number, minRentPeriod: number, maxRentPeriod: number): Promise<void> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    const cost = BigInt(Math.floor(rentPrice * 1e18));
    await this.contract.setRentStatus(x, y, availableForRent, cost, minRentPeriod, maxRentPeriod);
  }

  async setSaleStatus(x: number, y: number, availableForSale: boolean, salePrice: number): Promise<void> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    const cost = BigInt(Math.floor(salePrice * 1e18));
    await this.contract.setSaleStatus(x, y, availableForSale, cost);
  }
}
