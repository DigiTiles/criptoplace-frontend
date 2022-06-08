import {Component, OnInit} from '@angular/core';
import {ethers} from "ethers";

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.sass']
})
export class UploaderComponent {
  xPosition!: number;
  yPosition!: number;

  fileVerified = false;
  file!: string;

  onFileSelected(event: any) {
    this.fileVerified = false;
    const file: File = event.target.files[0];

    if (file) {
      const fr = new FileReader();
      fr.onload = () => { // when file has loaded
        const img = new Image();
        img.onload = () => {
          if (!fr.result) {
            alert('Something goes wrong.');
            return;
          }
          console.log(fr.result.toString());
          if (!fr.result.toString().match(/^data:image\/png;base64,(.*)$/)) {
            alert('The file should be PNG image!');
            return;
          }
          if (img.width !== 16 || img.height !== 16) {
            alert('The image should be 16x16 pixels size!');
            return;
          }
          this.fileVerified = true;
          this.file = fr.result.toString().replace(/^data:image\/png;base64,(.*)$/, '$1');
        };
        if (fr.result) {
          img.src = fr.result.toString(); // The data URL
        }
      };

      fr.readAsDataURL(file);
    }
  }

  submitFile() {
    console.log(this.xPosition);
    if (
      (!this.xPosition && this.xPosition !== 0) ||
      (!this.yPosition && this.yPosition !== 0)
    ) {
      alert("Please, select the tile (X Y coordinates) to post image!")
      return;
    }
    if (
      (this.xPosition || this.xPosition === 0) &&
      (this.yPosition || this.yPosition === 0) &&
      this.fileVerified
    ) {
      //@ts-ignore
      ethereum.request({method: "eth_accounts"}).then(accounts => {
        console.log(accounts)
        const contractAddress = '0x61c7230977b55DfaB8363E68F9536B88443af98F';
        // const contractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
        const abi = [
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
        ];
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(signer)
        const contract = new ethers.Contract(contractAddress, abi, signer);
        console.log(contract)
        try {
          contract.updateTile(this.xPosition, this.yPosition, this.file)
        } catch (error) {
          alert(error);
        }
      });

    }
  }
}
