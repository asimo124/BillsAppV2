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
  };
  private billsSource = new BehaviorSubject(this.billResults);
  public billsList = this.billsSource.asObservable();

  constructor(private http: HttpClient) { }

  loadBills(curBalance, payDate, hashCode, prevDate, nextDate) {

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

    this.http.get<any>('https://budget.hawleywebdesign.com/api/loadBillDates2.php?' + requestParams).subscribe(response => {

      this.billsSource.next(response);
    },
    (err) => {
      console.log('error', 'Error loading Growth By Standards : ' + err.error.message);
    });
  }
}
