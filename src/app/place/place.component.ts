import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Map, View} from "ol";
import {Tile} from "ol/layer";
import {XYZ} from "ol/source";
import {fromLonLat} from "ol/proj";
import {ethers} from "ethers";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.sass']
})
export class PlaceComponent implements OnInit, AfterViewInit {

  map!: Map;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    this.map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new XYZ({
            attributions: 'CriptoPlace:© 2022',
            url:
              'http://crypto-place.local/tiles/{z}x{x}x{y}.png?'+Math.random(),
            maxZoom: 26,
            projection: 'EPSG:4326',
            tileSize: 128, // the tile size supported by the ArcGIS tile service
            maxResolution: 180 / 512, // Esri's tile grid fits 180 degrees on one 512 px tile
            wrapX: false,
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        minZoom: 22,
        maxZoom: 28,
        zoom: 25
      })
    });
    this.map.on('click', function (e) {
      console.log(e)
      // var iconFeatureA = map.getFeaturesAtPixel(e.pixel);
      // if (iconFeatureA !== null) {
      //   var adres = iconFeatureA[0].get("adres");
      //   alert(adres);
      //   e.preventDefault(); // avoid bubbling
      // }
    });

    // let web3 = new Web3('ws://localhost:8546');

    //@ts-ignore
    console.log(typeof window.ethereum)
    //@ts-ignore
    if (typeof window.ethereum !== "undefined") {
      try {
        //@ts-ignore
        ethereum.request({method: "eth_requestAccounts"});
      } catch (error) {
        console.log(error);
        alert('Unknown error');
      }
      //@ts-ignore
      ethereum.request({method: "eth_accounts"}).then(accounts => {
        console.log(accounts)
        const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
        const abi = [
          {
            inputs: [
              {
                internalType: "int256",
                name: "x",
                type: "int256",
              },
              {
                internalType: "int256",
                name: "y",
                type: "int256",
              },
              {
                internalType: "string",
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
          // console.log(contract.updateTile(1,1,'sssssss'));
        } catch (error) {
          console.log(error);
        }


      });
    } else {
      alert("This Web3 application \r\nUse MetaMask extension to use the application features");
    }

  }
}
