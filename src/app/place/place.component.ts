import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Feature, Map, Overlay, View} from "ol";
import {Tile} from "ol/layer";
import {TileDebug, XYZ} from "ol/source";
import {fromLonLat, get} from "ol/proj";
import {Polygon} from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.sass']
})
export class PlaceComponent implements OnInit, AfterViewInit {
  map!: Map;
  selectorPolygon!: Polygon;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const layerSource = new XYZ({
      attributions: 'CriptoPlace:© 2022',
      url: 'http://tiles.cripto-place.com/tiles/{z}x{x}x{y}.png?' + Math.random(),
      maxZoom: 26,
      minZoom: 20,
      projection: 'EPSG:3857',
    });

    const mapView = new View({
      center: fromLonLat([0, 0]),
      minZoom: 20,
      maxZoom: 26,
      zoom: 23
    });

    this.selectorPolygon = new Polygon([[
      [90, 90],
      [90, 90],
      [90, 90],
      [90, 90]
    ]]);

    const div = document.getElementById('dddd') as HTMLElement;

    const overlay = new Overlay({
      element: div,
      autoPan: true,
      autoPanAnimation: {
        duration: 150
      }
    })

    const iconFeature = new Feature({
      geometry: this.selectorPolygon,
      name: 'Null Island',
      population: 4000,
      rainfall: 500
    });

    const vectorSource = new VectorSource({
      features: [iconFeature]
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: layerSource,
        }),
        new VectorLayer({
          source: vectorSource
        }),
        new Tile({
          source: new TileDebug({
            projection: 'EPSG:3857',
            tileGrid: layerSource.getTileGrid()
          })
        })
      ],
      overlays:[
        overlay
      ],
      view: mapView
    });
    const self = this;
    this.map.on('singleclick', function (e) {
      const grid = layerSource.getTileGrid();
      const zoom = mapView.getZoom()
      if (zoom) {
        const tileCord = grid.getTileCoordForCoordAndZ(e.coordinate, 26);
        console.log('clicked ', e.coordinate[0], e.coordinate[1]);
        console.log('tile z,x,y is:', tileCord[0], tileCord[1] - 33554432, tileCord[2] - 33554432);
        console.log(layerSource.getTileUrlFunction()(tileCord, 1, get('EPSG:3857')));

        const _x = tileCord[1] - 33554432;
        const _y = tileCord[2] - 33554432;

        const coordinatesPerTile = 0.59717;

        self.selectorPolygon.setCoordinates([[
          [_x * coordinatesPerTile, _y * -coordinatesPerTile],
          [(_x + 1) * coordinatesPerTile, _y * -coordinatesPerTile],
          [(_x + 1) * coordinatesPerTile, (_y + 1) * -coordinatesPerTile],
          [_x * coordinatesPerTile, (_y + 1) * -coordinatesPerTile]
        ]]);
        overlay.setPosition(e.coordinate)
      }
    });

    //@ts-ignore
    if (typeof window.ethereum !== "undefined") {
      try {
        //@ts-ignore
        ethereum.request({method: "eth_requestAccounts"});
      } catch (error) {
        console.log(error);
        alert('Unknown error');
      }
    } else {
      alert("This Web3 application \r\nUse MetaMask extension to use the application features");
    }
  }
}
