import { Component, ViewChild } from '@angular/core';
import { IAccLoadedEventArgs, AccumulationChart, ILoadedEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { ApiService } from '../../../../shared/services/api.service';

interface MiniStats {
  nameMiniGame: string;
  totalGamesCompleted: number;
  errorRatePercent?: number;
  text: string;
}

@Component({
  selector: 'app-mini-games',
  templateUrl: './mini-games.component.html',
  styleUrls: ['./mini-games.component.scss'],
})
export class MiniGamesComponent {
  @ViewChild('pie') pie: AccumulationChart;
  @ViewChild('pie2') pie2: AccumulationChart;

  data: MiniStats[] = [];

  legendSettings: object = {
    visible: true,
    position: 'Bottom'
  };

  dataLabel: object = {
    visible: true,
    name: 'text',
    position: 'Inside',
    font: {
      fontWeight: '600',
      color: '#ffffff',
      size: '30px'
    }
  };

  startAngle = 0;
  endAngle = 360;
  tooltip = {enable: true, shared: false};
  tooltipTitle = 'Mini Games';
  title = 'Popularity of mini games';
  titleErrorRate = 'Errors in mini games';

  constructor(private apiService: ApiService) {
    this.apiService.getUserStatistics().subscribe(
      (res) => {
        Object.entries(res.optional)
          .map(([key, value]) => {
            if (key && value.totalGamesCompleted) {
              this.data.push({...value, text: `${value.totalGamesCompleted}`, nameMiniGame: key});
            }
          });
        this.pie.refresh();
        this.pie2.refresh();
      });
  }

  public chartArea: object = {
    border: {
      width: 0
    }
  };

  width = '320px';

  public primaryXAxis: object = {
    valueType: 'Category',
    interval: 1,
    majorGridLines: {
      width: 0,
    }
  };

  public primaryYAxis: object = {
    title: 'Error Rate',
    maximum: 100,
  };

  load(args: IAccLoadedEventArgs): void {
    args.accumulation.theme = 'Bootstrap';
  }

  loadChart(args: ILoadedEventArgs): void {
    args.chart.theme = 'Bootstrap';
  }
}
