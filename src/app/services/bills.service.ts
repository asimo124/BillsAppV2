// items.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class BillsService {

  private billsItemList: any[];
  private billsSource = new BehaviorSubject(this.billsItemList);
  public billsList = this.billsSource.asObservable();

  constructor(private http: HttpClient) { }

  loadBills(curBalance, payDate) {

    let date = null;
    if (!payDate) {
      const today = new Date();
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    } else {
      date = payDate.toLocaleString();
    }
    console.log('date: ', date);

    this.http.get<any>('https://hawleywebdesign.com/api/loadBillDates2.php?user_id=1&current_balance=' + curBalance +
      '&pay_date=' + date).subscribe(response => {

      this.billsSource.next(response.results);
    },
    (err) => {
      console.log('error', 'Error loading Growth By Standards : ' + err.error.message);
    });
  }
}
