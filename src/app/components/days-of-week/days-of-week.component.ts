import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-days-of-week',
  templateUrl: './days-of-week.component.html',
  styleUrls: ['./days-of-week.component.scss']
})
export class DaysOfWeekComponent implements OnInit {

  @Input() billsDays: any;
  @Input() isExpanded = false;
  @Input() expandHeight = '720';
  @Output() shouldCallToggleEnabled: EventEmitter<any> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  callToggleEnabled(retVal: number) {
    this.shouldCallToggleEnabled.emit(1);
  }

}
