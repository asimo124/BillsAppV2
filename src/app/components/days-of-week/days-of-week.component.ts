import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-days-of-week',
  templateUrl: './days-of-week.component.html',
  styleUrls: ['./days-of-week.component.scss']
})
export class DaysOfWeekComponent implements OnInit {

  @Input() billsDays: any;

  constructor() { }

  ngOnInit() {
  }

}
