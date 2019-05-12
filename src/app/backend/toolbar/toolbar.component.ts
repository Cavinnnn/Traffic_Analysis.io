import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PlottingService } from 'src/app/shared/services/plotting.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public months: 'Searching Example';

  constructor(public _route: ActivatedRoute,
               public _plot: PlottingService) { }

  ngOnInit() {
    
  }

}
