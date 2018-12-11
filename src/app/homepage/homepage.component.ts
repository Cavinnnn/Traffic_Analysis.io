import { Component, OnInit } from '@angular/core';
import { HomepageService } from './homepage.service';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  map: mapboxgl.Map;
  
  style = 'mapbox://styles/cavinn/cjpie0lw3002m2spk0x8dfw0f';
  lat = 53.340602;
  lng = -6.281422 ;


  constructor(private _map: HomepageService) { }

  ngOnInit() {

    this.initializeMap();

  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat],
          zoom: 14,
        })
      });
    }

    this.buildMap()

  }

  buildMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2F2aW5uIiwiYSI6ImNqZW9nNjduejVrcTIyd21xMGhsYnB0bGwifQ.d1szzRngrK0u-qP_aiD64A';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 10,
      center: [this.lng, this.lat]
    });
  }
  
}
