import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  @Output() didToggleEnabled: EventEmitter<any> = new EventEmitter<number>();
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

  toggleEnabled(index) {

    this.expenses[index].isEnabled = !(this.expenses[index].isEnabled);
    if (!this.expenses[index].isEnabled) {
      this.expenses[index].amount = 0;
    } else {
      this.expenses[index].amount = this.expenses[index].savedAmount;
    }

    this.didToggleEnabled.emit(1);
  }

}
