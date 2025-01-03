import { Component } from '@angular/core';
import { MachinesService } from '../../services/machines.service';
import { map, Subscription } from 'rxjs';
import { Department } from '../../../models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BarChartComponent } from '../../../components/bar-chart/bar-chart.component';
import { CommonModule } from '@angular/common';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-machines',
  standalone: true,
  imports: [CommonModule, BarChartComponent,RouterLink],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.scss',
})
export class MachinesComponent {
  constructor(
    private machineService: MachinesService,
    private activatedRoute: ActivatedRoute
  ) {}
  private sub: Subscription = new Subscription();

  public charts: Array<ChartData<'bar'>> = [];
  public machinesName: string[] = [];
  public machinesID: string[] = [];
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
            };

            mappedData.datasets = [machineData];

            this.charts.push(mappedData);
            this.machinesName.push(`${machine.name}`);
            this.machinesID.push(`${machine.id}`);
          });
        })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
