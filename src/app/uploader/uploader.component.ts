import {Component, OnInit} from '@angular/core';
import {ethers} from "ethers";

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.sass']
})
export class UploaderComponent implements OnInit {

  fileName = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      console.log(file)
      let fr = new FileReader();
      fr.onload = () => { // when file has loaded
        console.log(fr.result)
        let img = new Image();
        img.onload = () => {
          console.log(img.width);
          console.log(img.height);
          if (img.width === 16 && img.height === 16 && fr.result && fr.result.toString().match(/^data:image\/png;base64,(.*)=$/)) {

            //@ts-ignore
            ethereum.request({method: "eth_accounts"}).then(accounts => {
              console.log(accounts)
              const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
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
                if (fr.result) {
                  console.log(fr.result.toString().replace(/^data:image\/png;base64,(.*)=$/, '$1'));
                  console.log(contract.updateTile(5, 6, fr.result.toString().replace(/^data:image\/png;base64,(.*)=$/, '$1')));
                }

              } catch (error) {
                console.log(error);
              }


            });
          }

        };
        if (fr.result)
          img.src = fr.result.toString(); // The data URL
      };

      fr.readAsDataURL(file);
    }
  }
}
