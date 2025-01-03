import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective,RouterLink],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  constructor(private activatedRoute: ActivatedRoute) {}
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;
  //option 1 for title set / get.
  @Input() set name(value: string) {
    this._name = value;
    this.barChartOptions.plugins.title.text = this._name;
    this.chart?.update();
  }
  private _name: string = '';
  // in this case not necessary to use get title() becaues we are not using title in the template and instead we update it in the set title method.
  get name(): string {
    return this._name;
  }
  public department: string = '';
  //end option 1

  //option 2 for title ngOnChanges
  // @Input() title: string = '';
  //end option 2

  @Input() set chartData(chartData: ChartData<'bar'>) {
    this._chartData = chartData;
    this.chart?.update();
  }
  ngOnInit(): void {
    this.department = this.activatedRoute.snapshot.params['department'];
  }
  private _chartData: ChartData<'bar'>;

  get chartData(): ChartData<'bar'> {
    return this._chartData;
  }

  public barChartType = 'bar' as const;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {},
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
  };
  //option 2 for title
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['title']) {
  //     this.barChartOptions.plugins.title.text = this.title;
  //     this.chart?.update();
  //   }
  // }
}
