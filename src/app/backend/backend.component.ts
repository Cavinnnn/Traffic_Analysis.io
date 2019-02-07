import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';
import { HomepageService } from '../homepage/homepage.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss']
})
export class BackendComponent implements OnInit {

  showFiller = false;
  map: mapboxgl.Map;

  style = 'mapbox://styles/cavinn/cjpie0lw3002m2spk0x8dfw0f';
  lat = 53.340602;
  lng = -6.281422 ;

  constructor(private _map: HomepageService,
              private router: Router,
              public authService: AuthService) { }

  ngOnInit() {
    
    this.initializeMap();

  }
  
  logout() {
    this.authService.logout();
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

    this.map.on('load', (event) => {
      this.map.addLayer({
        "id": "route",
          "type": "line",
          "source": {
              "type": "geojson",
              "data": {
                  "type": "Feature",
                  "properties": {},
                  "geometry": {
                      "type": "LineString",
                      "coordinates": [
                          [-6.24122142791748, 53.347643698735],
                          [-6.251220703125, 53.348284160625184],
                      ]
                  }
              }
          },
          "layout": {
              "line-join": "round",
              "line-cap": "round"
          },
          "paint": {
              "line-color": "red",
              "line-width": 8
          }
      })

      this.map.loadImage("https://i.imgur.com/MK4NUzI.png",(error, image) => {
        if (error) throw error;
        this.map.addImage("custom-marker", image);
        /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
        this.map.addLayer({
          id: "markers",
          type: "symbol",
          /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features:[{"type":"Feature","geometry":{"type":"Point","coordinates":[-6.2434422969818115, 53.347797410466136]}}]}
          },
          layout: {
            "icon-image": "custom-marker",
          }
        });
      });
    });
  }

  
}
