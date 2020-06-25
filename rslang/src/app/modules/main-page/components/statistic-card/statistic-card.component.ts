import { Component, OnInit } from '@angular/core';
import { PeriodicElement } from '../../../../shared/interfaces';
import { ELEMENT_DATA } from '../../../../common/mock';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.scss'],
})
export class StatisticCardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
