import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Feature, Map, Overlay, View } from 'ol';
import { Tile } from 'ol/layer';
import { TileDebug, XYZ } from 'ol/source';
import { fromLonLat, get } from 'ol/proj';
import { Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.sass'],
})
export class PlaceComponent implements OnInit, AfterViewInit {
  @ViewChild('tailSelector') tailSelector!: ElementRef;
  selectedX!: number;
  selectedY!: number;
  selectedImage!: string;

  map!: Map;
  selectorPolygon!: Polygon;

  constructor() {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    const layers = [];
    const layerSource = new XYZ({
      attributions: 'CriptoPlace:© 2022',
      url:
        'https://tiles.cripto-place.com/tiles/{z}x{x}x{y}.png?' + Math.random(),
      maxZoom: 26,
      minZoom: 20,
      projection: 'EPSG:3857',
    });
    layers.push(
      new Tile({
        source: layerSource,
      })
    );

    const mapView = new View({
      center: fromLonLat([0, 0]),
      minZoom: 20,
      maxZoom: 26,
      zoom: 23,
    });

    this.selectorPolygon = new Polygon([
      [
        [90, 90],
        [90, 90],
        [90, 90],
        [90, 90],
      ],
    ]);

    const overlay = new Overlay({
      element: this.tailSelector.nativeElement,
      autoPan: true,
      autoPanAnimation: {
        duration: 150,
      },
    });

    const iconFeature = new Feature({
      geometry: this.selectorPolygon,
      name: 'Null Island',
      population: 4000,
      rainfall: 500,
    });

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    layers.push(
      new VectorLayer({
        source: vectorSource,
      })
    );

    if (!environment.production) {
      //add debug layer
      layers.push(
        new Tile({
          source: new TileDebug({
            projection: 'EPSG:3857',
            tileGrid: layerSource.getTileGrid(),
          }),
        })
      );
    }

    this.map = new Map({
      target: 'map',
      layers: layers,
      overlays: [overlay],
      view: mapView,
    });

    const self = this;

    this.map.on('singleclick', function (e) {
      const grid = layerSource.getTileGrid();
      const zoom = mapView.getZoom();
      if (zoom) {
        const tileCord = grid.getTileCoordForCoordAndZ(e.coordinate, 26);
        console.log('clicked ', e.coordinate[0], e.coordinate[1]);
        console.log(
          'tile z,x,y is:',
          tileCord[0],
          tileCord[1] - 33554432,
          tileCord[2] - 33554432
        );
        console.log(
          layerSource.getTileUrlFunction()(tileCord, 1, get('EPSG:3857'))
        );

        self.selectedX = tileCord[1] - 33554432;
        self.selectedY = tileCord[2] - 33554432;
        self.selectedImage =
          `https://tiles.cripto-place.com/tiles/26x${tileCord[1]}x${tileCord[2]}.png?` +
          Math.random();

        const coordinatesPerTile = 0.59717;

        self.selectorPolygon.setCoordinates([
          [
            [
              self.selectedX * coordinatesPerTile,
              self.selectedY * -coordinatesPerTile,
            ],
            [
              (self.selectedX + 1) * coordinatesPerTile,
              self.selectedY * -coordinatesPerTile,
            ],
            [
              (self.selectedX + 1) * coordinatesPerTile,
              (self.selectedY + 1) * -coordinatesPerTile,
            ],
            [
              self.selectedX * coordinatesPerTile,
              (self.selectedY + 1) * -coordinatesPerTile,
            ],
          ],
        ]);
        overlay.setPosition(e.coordinate);
      }
    });
  }
}
