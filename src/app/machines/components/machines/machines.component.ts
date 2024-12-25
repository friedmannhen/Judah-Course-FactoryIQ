import { Component } from '@angular/core';
import { MachinesService } from '../../../services/machines.service';
import { map, tap, Subscription } from 'rxjs';
import { Department } from '../../../models';
import { ActivatedRoute } from '@angular/router';
import { BarChartComponent } from '../../../components/bar-chart/bar-chart.component';
import { CommonModule } from '@angular/common';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-machines',
  standalone: true,
  imports: [CommonModule, BarChartComponent],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.scss',
})
export class MachinesComponent {
  constructor(
    private machineService: MachinesService,
    private activatedRoute: ActivatedRoute
  ) {}
  private sub: Subscription = new Subscription();

  public barChartData: ChartData<'bar'>;
  public charts: Array<ChartData<'bar'>> = [];
  public chartsTitles: string[] = [];
  public departmentName: string;
  ngOnInit() {
    this.departmentName = this.activatedRoute.snapshot.params['department'];

    this.sub.add(
      this.machineService
        .getMachinesData()
        .pipe(
          map((data) => {
            const depIndex = data.findIndex((department) => {
              return department.name === this.departmentName;
            });
            return data[depIndex];
          })
        )
        .subscribe((data: Department) => {
          console.log(data);
          // const colors = ['#9BD0F5', '#973838', '#565099'];
          this.charts = [];

          data.machines.forEach((machine) => {
            const mappedData = {
              labels: [],
              datasets: [{ data: [], label: '' }],
            };
            mappedData.labels = Object.keys(machine.metrics);

            const machineData = {
              data: Object.keys(machine.metrics).map((key) => {
                return machine.metrics[key];
              }),
              label: machine.name,
              //colors: colors,
            };

            mappedData.datasets = [machineData];

            this.charts.push(mappedData);
            this.chartsTitles.push(`${machine.name} (id: ${machine.id})`);
          });
        })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
