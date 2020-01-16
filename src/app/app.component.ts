import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BillsService} from './services/bills.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  currentDate;
  curBalance: number;
  title = 'bills2';
  billsList: any[];

  subs: Subscription[] = [];

  constructor(private billsService: BillsService) {

  }

  ngOnInit(): void {

    // get and subscribe to Coachee Growth Benchmarks Download Data
    this.subs.push(this.billsService.billsList.subscribe(billsList => {
      if (billsList) {
        this.billsList = billsList;
        console.log('billsList: ', this.billsList);
      }
    }));

    this.loadBills();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  onChange(event) {
    console.log('event: ', event.toLocaleString());
  }

  loadBills() {

    if (this.currentDate) {
      console.log('this.currentDate: ', this.currentDate.toLocaleString());
    }

    const balance = this.curBalance ? this.curBalance : 960;
    this.billsService.loadBills(balance, this.currentDate);
  }
}
