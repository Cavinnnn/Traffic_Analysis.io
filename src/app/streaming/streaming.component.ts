import { Component, OnInit, DoCheck } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { PlottingService } from '../shared/services/plotting.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss']
})
export class StreamingComponent implements OnInit {

  map: mapboxgl.Map;
  lat = 53.340602;
  lng = -6.281422;
  dir;
  locate;
  public sample = [];
  public m50_colour = [];
  public m1_colour = [];
  public chapel_colour = [];
  public naas_colour = [];
  public navan_colour = [];


  constructor(
    public _plot: PlottingService,
    public authService: AuthService,
    public _http: HttpClient,
    public db: AngularFireDatabase,
    public _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.plotSentiment();
    this.search(this.locate);
  }

  
  plotSentiment() {
    this.db.list(`sentiment/all`).valueChanges().subscribe((colours: any) => {
      let m50: [0, 1];

      m50 = colours[2];

      this.m50_colour = m50[Object.keys(m50)[0]]

      this.initializeLocation();
    })
  }

  search(location) {
    if (location) {


      let api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}%20dublin.json?access_token=pk.eyJ1IjoiY2F2aW5uIiwiYSI6ImNqZW9nNjduejVrcTIyd21xMGhsYnB0bGwifQ.d1szzRngrK0u-qP_aiD64A`;


      console.log(location)

      return this._http.get(api)
        .pipe(
          tap((res: any) => res)
        ).subscribe(locations => {

          var loc_lat = locations.features[0].bbox[1];
          var loc_lng = locations.features[0].bbox[0];

          var search = [loc_lng, loc_lat]

          // this.directions(search);

          this.map.flyTo({
            center: search,
            zoom: 14,
          });
        });

    }

  }

  initializeLocation() {
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
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 10,
      center: [this.lng, this.lat]
    });

    this.m50();
  }

  directions(location) {

    this.map.on('load', () => {

      let directions_api = `https://api.mapbox.com/directions/v5/mapbox/driving/-6.242863,53.349203;${location}?geometries=geojson&access_token=pk.eyJ1IjoiY2F2aW5uIiwiYSI6ImNqZW9nNjduejVrcTIyd21xMGhsYnB0bGwifQ.d1szzRngrK0u-qP_aiD64A`;
      console.log(location)


      return this._http.get(directions_api)
        .pipe(
          tap((res: any) => res)
        ).subscribe(directions => {

          this.dir = directions

          console.log("route: " + directions.routes[0].geometry)

          this.map.addLayer({
            "id": "1",
            "type": "line",
            "source": {
              "type": "geojson",
              "data": {
                "type": 'Feature',
                "properties": {},
                "geometry": directions.routes[0].geometry
              }
            },
            "layout": {
              "line-join": "round",
              "line-cap": "round"
            },
            "paint": {
              "line-color": "blue",
              "line-width": 3
            }
          });
        });
    });
  }

  m50() {
    this.map.on('load', (event) => {
      this.map.addLayer({
        "id": "m50",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": 'Feature',
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": this._plot.plot_m50,
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": this.m50_colour,
          "line-width": 3
        }
      });
    });
  }

}
