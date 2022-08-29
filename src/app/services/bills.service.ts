// items.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class BillsService {

  private billResults: {
    results: any[];
    hash_key: string;
    cur_balance: number;
    pay_date: string;
    num_days_pay_period: number;
    remaining_balance: number;
  };
  private billsSource = new BehaviorSubject(this.billResults);
  public billsList = this.billsSource.asObservable();

  constructor(private http: HttpClient) { }

  loadBills(curBalance, payDate, hashCode, prevDate, nextDate, testMode = false) {

    let date = null;
    if (!payDate) {
      const today = new Date();
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    } else {
      date = payDate.toLocaleString();
    }
    console.log('date: ', date);

    let requestParams = 'user_id=1&pay_date=' + date + '&';
    if (curBalance) {
      requestParams += 'current_balance=' + curBalance + '&';
    }
    if (hashCode) {
      requestParams += 'hash_key_token_cs=' + hashCode + '&';
    }
    if (prevDate) {
      requestParams += 'prev_date=1' + '&';
    } else if (nextDate) {
      requestParams += 'next_date=1' + '&';
    }
    if (testMode) {
      requestParams += 'test_mode=1' + '&';
    }

    this.http.get<any>('https://budget.hawleywebdesign.com/api/loadBillDates2.php?' + requestParams).subscribe(response => {

      this.billsSource.next(response);
    },
    (err) => {
      console.log('error', 'Error loading Growth By Standards : ' + err.error.message);
    });
  }

  savePayPeriodNumDays(numDays, payDate) {

    let date = null;
    if (!payDate) {
      const today = new Date();
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    } else {
      date = payDate.toLocaleString();
    }
    if (!numDays) {
      numDays = 1;
    }

    const requestParams = 'pay_date=' + date + '&num_days=' + numDays;

    this.http.get<any>('https://budget.hawleywebdesign.com/api/save_pay_period_num_days.php?' + requestParams).subscribe(response => {

    },
    (err) => {
      console.log('error', 'Error loading Growth By Standards : ' + err.error.message);
    });
  }
}
