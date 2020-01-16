import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  @Input() expenses: any[];

  colors = [
    '#18cc99',
    '#ff0266',
    '#ffc412',
    '#7d52e3',
    '#ff9e22',
    '#0336ff',
    '#ee0290'
  ];

  constructor() { }

  ngOnInit() {
  }

  getColor(index: number) {
    if (index < 7) {
      return this.colors[index];
    } else {
      const newIndex = index % 7;
      return this.colors[newIndex];
    }
  }

}
