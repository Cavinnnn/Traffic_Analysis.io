import { Component, OnInit } from '@angular/core';
import { HomepageService } from './homepage.service';
import * as mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';


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


  constructor(private _map: HomepageService, private router: Router) 
  {}

  ngOnInit() {
    this.initializeMap();
  }

  sign(){
    this.router.navigate(['./sign']);
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
                    [
                      -6.24122142791748,
                      53.347643698735
                    ],
                    [
                      -6.251220703125,
                      53.348284160625184
                    ]
                  ]
                }
            }
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#888",
            "line-width": 12
        }
    });
    
  }


  
}
