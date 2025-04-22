export interface Tile {
  owner: string;
  rentedBy: string;
  price: number;
  rentPrice: number;
  minRentPeriod: number;
  maxRentPeriod: number;
  rentedUntil: number;
  availableForRent: boolean;
  availableForSale: boolean;
  image: string;
  lastAction: string;
  timeAction: number;
}
