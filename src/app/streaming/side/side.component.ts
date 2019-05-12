import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { PlottingService } from 'src/app/shared/services/plotting.service';
import { StreamingComponent } from '../streaming.component';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  escape;
  acc;
  location: string;

  public lineChartData:Array<any> = []
  

  public lineChartLabels:Array<any> = ['December', 'January', 'February', 'March', 'April', 'May'];
  public lineChartType:string = 'line';

  constructor(public _stream: StreamingComponent,
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
    this._stream.search(this.location);
    this.location = '';
  }

}
