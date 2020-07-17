import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { MiniGamesComponent } from './components/mini-games/mini-games.component';
import { AccumulationChartModule, ChartModule } from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [StatisticsComponent, MiniGamesComponent],
  imports: [CommonModule, AccumulationChartModule, ChartModule],
})
export class StatisticsModule {}
