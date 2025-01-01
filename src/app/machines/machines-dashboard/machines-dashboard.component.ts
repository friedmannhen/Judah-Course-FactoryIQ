import { Component } from '@angular/core';
import { MachinesService } from '../services/machines.service';
import { Subscription } from 'rxjs';
import { Department, IPieChart } from '../../models';
import { PieComponent } from '../../components/pie/pie.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MachinesTableComponent } from '../components/machines-table/machines-table.component';
import {MatCardModule} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-machines-dashboard',
  standalone: true,
  imports: [
    PieComponent,
    CommonModule,
    RouterModule,
    MatTabsModule,
    MachinesTableComponent,
    MatCardModule,
    MatButton,
  ],
  templateUrl: './machines-dashboard.component.html',
  styleUrl: './machines-dashboard.component.scss',
})
export class MachinesDashboardComponent {
  constructor(private machineService: MachinesService) {}

  private sub: Subscription = new Subscription();

  public chartsData: { [key: string]: IPieChart } = {};
  public departmentsData: Department[];

  ngOnInit() {
    this.sub.add(
      this.machineService.getMachinesData().subscribe((data: Department[]) => {
        this.departmentsData = data;
        data.forEach((department) => {
          const machinesObj = {};

          department.machines.forEach((machine) => {
            if (machinesObj[machine.status]) {
              machinesObj[machine.status]++;
            } else {
              machinesObj[machine.status] = 1;
            }
          });

          const labels = Object.keys(machinesObj);
          const colors = this.getColorsForLabels(labels);
  

          this.pieChartData = {
            labels: labels,
            datasets: [
      
              {
                data: Object.values(machinesObj),
                backgroundColor: colors,
              },
            ],
          };
          this.chartsData[department.name] = this.pieChartData;
        });

        // console.log(data);
      })
    );
  }
  public labelColorMap: { [key: string]: string } = {
    'Running': '#5CB338',
    'Under Maintenance': '#FB4141',
    'Idle': '#ECE852',
  };
  
   getColorsForLabels(labels: string[]): string[] {
    return labels.map(label => this.labelColorMap[label] || '#000000'); // Default to black if label not found
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public pieChartOptions: any = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };
  public pieChartData: any = {
    labels: ['Running', 'Idle', 'Under Maintenance'],
    datasets: [
      {
        data: [300, 500, 100],
      },
    ],
  };
}
