import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ContractService} from "../../../services/contract.service";

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.sass']
})
export class PaintingComponent implements OnChanges{
  @Input() xPosition!: number;
  @Input() yPosition!: number;
  @Input() image!: string;
  grid: string[][] = [];
  selectedColor: string = '#000000';
  base64Output: string = '';
  paletteColors: string[] = [
    '#000000', '#FFFFFF', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#808080', '#FFA500', '#800080',
    '#8B0000', '#006400', '#00008B', '#808000', '#FFC0CB',
    '#A52A2A', '#008080', '#4682B4', '#D2691E', '#B0C4DE',
    '#DC143C', '#ADFF2F', '#F08080', '#20B2AA', '#7B68EE',
    '#FF1493', '#2E8B57', '#FF0000', '#BA55D3', '#40E0D0'
  ];

  constructor(public criptoService: ContractService) {
    this.initializeGrid();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['image'] && changes['image'].currentValue) {
      this.loadFromImageURL(changes['image'].currentValue);
    }
  }

  initializeGrid() {
    this.grid = Array.from({ length: 16 }, () => Array(16).fill('#ffffff'));
  }

  setColor(row: number, col: number) {
    this.grid[row][col] = this.selectedColor;
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  async saveToBase64() {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      for (let row = 0; row < 16; row++) {
        for (let col = 0; col < 16; col++) {
          ctx.fillStyle = this.grid[row][col];
          ctx.fillRect(col, row, 1, 1);
        }
      }
      this.base64Output = canvas.toDataURL();
    }
    await this.criptoService.setTileImage(this.xPosition, this.yPosition, this.base64Output);
  }

  async loadFromImageURL(imageURL: string) {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imageURL;
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject('Error loading image');
    });

    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(image, 0, 0, 16, 16);

      const imageData = ctx.getImageData(0, 0, 16, 16);
      const data = imageData.data;

      let grid: string[][] = [];
      for (let row = 0; row < 16; row++) {
        const rowColors: string[] = [];
        for (let col = 0; col < 16; col++) {
          const index = (row * 16 + col) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];

          const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
          rowColors.push(hexColor);
        }
        grid.push(rowColors);
      }

      this.grid = grid;
    }
  }
}
