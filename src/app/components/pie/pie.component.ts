import { Component, Input, ViewChild } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { IPieChart, IPieChartOptions, IPieDataSet } from '../../models';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss',
})
export class PieComponent {
  @Input() set pieChartData(data: IPieChart) {
    this._pieChartData = data;
    // console.log(this.chart);
    // console.log('update');
    this.chart?.update();
  }

  private _pieChartData: IPieChart;

  get pieChartData(): ChartData<'pie', number[], string | string[]> {
    return this._pieChartData as any as ChartData<
      'pie',
      number[],
      string | string[]
    >;
  }

  @Input() pieChartOptions: IPieChartOptions;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public readonly type: ChartType = 'pie';
}
