import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { BackendComponent } from '../backend.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  location: string;

  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56],
  ];

  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May'];
  public lineChartType:string = 'line';

  constructor(public _back: BackendComponent,
              public authService: AuthService) { }

  ngOnInit() {
  }


  logout() {
    this.authService.logout();
  }

  search() {
    this._back.search(this.location);
    this.location = '';
  }
}
