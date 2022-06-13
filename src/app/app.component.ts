import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BillsService} from './services/bills.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {

  isExpanded = false;
  expandHeight = '720';
  currentDate: Date;
  prevDate = false;
  nextDate = false;
  curBalance = 0;
  title = 'bills2';
  billResults: {
    results: any[];
    hash_key: string;
    cur_balance: number;
  };
  billsList: any[];
  numDaysPayPeriod = 1;
  remainingBalance = 950;
  daysLeftCount = 0;

  disposablePerDay = 60;
  finalDays = 14;

  subs: Subscription[] = [];

  constructor(private billsService: BillsService) {

  }

  ngOnInit(): void {

    this.currentDate = new Date();

    const disposablePerDay = localStorage.getItem('disposablePerDay');
    if (disposablePerDay) {
      this.disposablePerDay = parseInt(disposablePerDay, 10);
    }

    // get and subscribe to Coachee Growth Benchmarks Download Data
    this.subs.push(this.billsService.billsList.subscribe(response => {
      if (response) {
        this.billResults = response;
        this.billsList = response.results;

        //*/
        const self = this;
        this.daysLeftCount = 0;
        this.billsList.forEach(function getWeek(week) {
          week.days.forEach(function getDay(day) {
            if (day.showAsDay) {
              self.daysLeftCount++;
            }
          });
        });
        //*/
        this.curBalance = response.cur_balance;

        this.currentDate = null;
        console.log('response.pay_date: ', response.pay_date);
        this.currentDate = new Date(response.pay_date);
        this.numDaysPayPeriod = response.num_days_pay_period;
        this.remainingBalance = response.remaining_balance;
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

  loadPrevDate() {
    this.nextDate = false;
    this.prevDate = true;
    this.loadBills();
  }

  loadNextDate() {
    this.prevDate = false;
    this.nextDate = true;
    this.loadBills();
  }

  toggleExpand() {
    if (!this.isExpanded) {
      this.isExpanded = true;
    } else {
      this.isExpanded = false;
    }
  }


  loadToday() {
    this.currentDate = new Date();
    this.setDefaultsAndSearch();
  }

  setDefaultsAndSearch() {
    this.prevDate = false;
    this.nextDate = false;

    if (this.disposablePerDay) {
      localStorage.setItem('disposablePerDay', String(this.disposablePerDay));
    }

    this.loadBills();
  }

  loadBills() {

    let hashCode = '';
    if (this.billResults && this.billResults.hash_key) {
      hashCode = this.billResults.hash_key;
    }

    const balance = this.curBalance ? this.curBalance : 0;
    this.billsService.loadBills(balance, this.currentDate, hashCode, this.prevDate, this.nextDate);
  }

  updatePayPeriodNumDays() {

    if (this.disposablePerDay) {
      localStorage.setItem('disposablePerDay', String(this.disposablePerDay));
    }

    this.billsService.savePayPeriodNumDays(this.numDaysPayPeriod, this.currentDate);
  }

  getDisposableNeeded() {
    this.finalDays = this.daysLeftCount +  this.numDaysPayPeriod;
    return this.finalDays * this.disposablePerDay;
  }

  getDisposableLeft() {
    return this.remainingBalance - this.getDisposableNeeded();
  }
}
