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
import { fromLonLat} from 'ol/proj';
import { Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { environment } from '../../environments/environment';
import {ContractService} from "../../services/contract.service";
import {PositionService} from "../../services/position.service";

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
  infoTitle: any = '';
  private socket!: WebSocket;
  private tileVersion = Date.now();
  private tileLayer!: any;
  private layerSource!: XYZ;
  map!: Map;
  selectorPolygon!: Polygon;

  constructor(protected criptoService: ContractService, protected positionService: PositionService) {}
  async ngOnInit(): Promise<void> {
    await this.criptoService.connectWallet();
  }
  ngAfterViewInit(): void {
    const layers = [];
    this.layerSource = new XYZ({
      attributions: 'CriptoPlace:© 2025',
      url: this.getTileUrl(),
      maxZoom: 26,
      minZoom: 20,
      projection: 'EPSG:3857',
    });

    this.tileLayer = new Tile({
      source: this.layerSource,
    });

    layers.push(this.tileLayer);

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
            tileGrid: this.layerSource.getTileGrid(),
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

    this.initWebSocket();

    const self = this;

    this.map.on('singleclick', (e) => {
      const grid = this.layerSource.getTileGrid();
      const zoom = mapView.getZoom();
      if (zoom) {
        const tileCord = grid.getTileCoordForCoordAndZ(e.coordinate, 26);

        self.selectedX = tileCord[1] - 33554432;
        self.selectedY = tileCord[2] - 33554432;
        self.selectedImage =
          `https://digitiles.itwis-demos.com:8080/tiles/26x${tileCord[1]}x${tileCord[2]}.png?` +
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

        this.positionService.updatePosition(this.selectedX, this.selectedY, this.selectedImage);
      }
    });
  }

  getTileUrl(): string {
    return 'https://digitiles.itwis-demos.com:8080/tiles/{z}x{x}x{y}.png?v=' + this.tileVersion;
  }

  refreshTiles(): void {
    this.tileVersion = Date.now(); // обновим версию
    const newSource = new XYZ({
      attributions: 'CriptoPlace:© 2025',
      url: this.getTileUrl(),
      maxZoom: 26,
      minZoom: 20,
      projection: 'EPSG:3857',
    });
    this.tileLayer.setSource(newSource);
  }

  initWebSocket(): void {
    this.socket = new WebSocket('ws://digitiles.itwis-demos.com:10077');

    this.socket.onopen = () => {};

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'tileUpdate') {
        this.refreshTiles();
      }
    };

    this.socket.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    this.socket.onclose = () => {
      setTimeout(() => this.initWebSocket(), 5000);
    };
  }
}
