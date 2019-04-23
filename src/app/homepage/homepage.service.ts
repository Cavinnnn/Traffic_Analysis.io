import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(public _http: HttpClient) { }

  private newsUrl = 'https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyBxW4dyudSvkNM8qfGPtVSbXV3Tu8gd2Z0';
  // https://maps.googleapis.com/maps/api/directions/json?origin=Glasnevin&destination=Palmerstown&avoid=highways&mode=driving&key=AIzaSyBxW4dyudSvkNM8qfGPtVSbXV3Tu8gd2Z0
  getDirections() {
    return this._http.get(this.newsUrl)
      .pipe(
        tap(res => res)
      );
  }
}
