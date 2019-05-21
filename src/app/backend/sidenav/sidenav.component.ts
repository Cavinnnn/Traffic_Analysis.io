import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { BackendComponent } from '../backend.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { PlottingService } from 'src/app/shared/services/plotting.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  escape;
  acc;
  location: string;

  public lineChartData:Array<any> = []
  

  public lineChartLabels:Array<any> = ['December', 'January', 'February', 'March', 'April', 'May'];
  public lineChartType:string = 'line';

  constructor(public _back: BackendComponent,
              public _plot: PlottingService,
              public authService: AuthService,
              public _http: HttpClient,
              public db: AngularFireDatabase) { 
                this.db.list('accidents').valueChanges().subscribe((accidents: any) => {
                  
                  this.lineChartData = accidents;
                  
                })
              }

  ngOnInit() {
    
  }

  close(escape) {

  }

  logout() {
    this.authService.logout();
  }

  search() {
    this._back.search(this.location);
    // this._back.directions(this.location);
    this.location = '';
  }
}
