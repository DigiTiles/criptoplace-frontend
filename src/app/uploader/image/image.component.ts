import {Component, Input} from '@angular/core';
import {ContractService} from "../../../services/contract.service";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass']
})
export class ImageComponent {
  @Input() xPosition!: number;
  @Input() yPosition!: number;
  @Input() image!: string;
  fileVerified = false;
  file!: string;

  constructor(public criptoService: ContractService) {}


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file || file.type !== 'image/png') {
      alert('Только PNG!');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const img = new Image();
      img.onload = () => {
        if (img.width !== 16 || img.height !== 16) {
          alert('Изображение должно быть 16x16!');
          return;
        }
        this.image = result;
      };
      img.src = result;
      this.file = result;
    };
    reader.readAsDataURL(file);
  }

  async setImage() {
    if (!this.isCoordinateValid("Please, select the tile (X Y coordinates) to post image!")){ return; }
    await this.criptoService.setTileImage(this.xPosition, this.yPosition, this.file);
  }

  isCoordinateValid(message: string) {
    if (
      (!this.xPosition && this.xPosition !== 0) ||
      (!this.yPosition && this.yPosition !== 0)
    ) {
      alert(message)
      return false;
    }
    return true;
  }
}
