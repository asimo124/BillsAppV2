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
  billResults: {
    results: any[];
    hash_key: string;
    cur_balance: number;
  };
  billsList: any[];

  subs: Subscription[] = [];

  constructor(private billsService: BillsService) {

  }

  ngOnInit(): void {

    // get and subscribe to Coachee Growth Benchmarks Download Data
    this.subs.push(this.billsService.billsList.subscribe(response => {
      if (response) {
        this.billResults = response;
        this.billsList = response.results;
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

    let hashCode = '';
    if (this.billResults && this.billResults.hash_key) {
      hashCode = this.billResults.hash_key;
    }

    const balance = this.curBalance ? this.curBalance : 0;
    this.billsService.loadBills(balance, this.currentDate, hashCode);
  }
}
