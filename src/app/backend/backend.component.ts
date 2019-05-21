import { Component, OnInit, DoCheck } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { PlottingService } from '../shared/services/plotting.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss']
})

export class BackendComponent implements OnInit {
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
      let chapelizod: [0, 1];
      let m1: [0, 1];
      let m50: [0, 1];
      let naas: [0, 1];
      let navan: [0, 1];

      chapelizod = colours[0];
      m1 = colours[1];
      m50 = colours[2];
      naas = colours[3];
      navan = colours[4]


      this.chapel_colour = chapelizod[Object.keys(chapelizod)[0]]
      this.m1_colour = m1[Object.keys(m1)[0]]
      this.m50_colour = m50[Object.keys(m50)[0]]
      this.naas_colour = naas[Object.keys(naas)[0]]
      this.navan_colour = navan[Object.keys(navan)[0]]

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

    let val;

    this.m50();
    this.m1();
    this.chapel();
    this.naas();
    this.navan();
    this.directions();
  }

  directions() {

    let directions_api = `https://api.mapbox.com/directions/v5/mapbox/driving/-6.242863,53.349203;${location}?geometries=geojson&access_token=pk.eyJ1IjoiY2F2aW5uIiwiYSI6ImNqZW9nNjduejVrcTIyd21xMGhsYnB0bGwifQ.d1szzRngrK0u-qP_aiD64A`;
    // let directions_api = `https://api.mapbox.com/directions/v5/mapbox/driving/-6.242863,53.349203;-6.293959,53.345932?geometries=geojson&access_token=pk.eyJ1IjoiY2F2aW5uIiwiYSI6ImNqZW9nNjduejVrcTIyd21xMGhsYnB0bGwifQ.d1szzRngrK0u-qP_aiD64A`;

    this.map.on('load', (event) => {
      return this._http.get(directions_api)
        .pipe(
          tap((res: any) => res)
        ).subscribe(directions => {

          this.dir = directions

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

  chapel() {
    this.map.on('load', (event) => {
      this.map.addLayer({
        "id": "chapel",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": 'Feature',
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": this._plot.plot_chapelizod,
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": this.chapel_colour,
          "line-width": 3
        }
      });
    });
  }

  m1() {
    this.map.on('load', (event) => {
      this.map.addLayer({
        "id": "m1",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": 'Feature',
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": this._plot.plot_m1,
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": this.m1_colour,
          "line-width": 3
        }
      });
    });


  }

  naas() {
    this.map.on('load', (event) => {
      this.map.addLayer({
        "id": "naas",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": 'Feature',
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": this._plot.plot_naas,
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": this.naas_colour,
          "line-width": 3
        }
      });
    });

  }

  navan() {
    this.map.on('load', (event) => {
      this.map.addLayer({
        "id": "navan",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": 'Feature',
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": this._plot.plot_navan,
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": this.navan_colour,
          "line-width": 3
        }
      });
    });

  }

}

