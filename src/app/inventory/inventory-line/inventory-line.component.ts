import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { InventoryService } from '../services/inventory.service';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';

@Component({
  selector: 'app-inventory-line',
  imports: [LineChartComponent, CommonModule],
  templateUrl: './inventory-line.component.html',
  styleUrl: './inventory-line.component.scss',
})
export class InventoryLineComponent {
  constructor(private inventoryService: InventoryService) {}

  // private sub: Subscription = new Subscription();
  // public chart: ChartData<'line'>;

  ngOnInit() {
    this.inventoryService.getInventoryData().subscribe((data) => {
      let updatededLineChartData: ChartData<'line'> = this.lineChartData;
      data.forEach((department, index) => {
        if (!updatededLineChartData.datasets[index]) {
          updatededLineChartData.datasets.push({ data: [], label: '' });
          updatededLineChartData.datasets[index].label = department.name;
        }
        let totalStock = 0;
        department.inventory.forEach((inv) => {
          totalStock += inv.stock;
        });
        updatededLineChartData.datasets[index].data.push(totalStock);
        if (updatededLineChartData.datasets[index].data.length > 30) {
          updatededLineChartData.datasets[index].data.shift();
        }
      });
      const time = new Date();
      updatededLineChartData.labels.push(
        time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
      );
      if (updatededLineChartData.labels.length > 30) {
        updatededLineChartData.labels.shift();
      }
      this.lineChartData = { ...updatededLineChartData }; // because i want to trigger change detection i need to create a new object
      console.log(this.lineChartData);
    });
  }

  public lineChartData: ChartData<'line'> = {
    datasets: [
      // {
      // data: [],
      // label: '',
      //   backgroundColor: 'rgba(148,159,177,0.2)',
      //   borderColor: 'rgba(148,159,177,1)',
      //   pointBackgroundColor: 'rgba(148,159,177,1)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      //   fill: 'origin',
      // },
      // {
      //   data: [],
      //   label: 'Raw Materials',
      //   backgroundColor: 'rgba(77,83,96,0.2)',
      //   borderColor: 'rgba(77,83,96,1)',
      //   pointBackgroundColor: 'rgba(77,83,96,1)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(77,83,96,1)',
      //   fill: 'origin',
      // },
      // {
      //   data: [],
      //   label: 'Finished Goods',
      //   yAxisID: 'y1',
      //   backgroundColor: 'rgba(30, 255, 0, 0.3)',
      //   borderColor: 'red',
      //   pointBackgroundColor: 'rgba(148,159,177,1)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      //   fill: 'origin',
      // },
      // {
      //   data: [],
      //   label: 'Spare Parts',
      //   yAxisID: 'y1',
      //   backgroundColor: 'rgba(21, 0, 255, 0.3)',
      //   borderColor: 'red',
      //   pointBackgroundColor: 'rgba(148,159,177,1)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      //   fill: 'origin',
      // },
      // {
      //   data: [],
      //   label: 'Consumables',
      //   yAxisID: 'y1',
      //   backgroundColor: 'rgba(255, 0, 76, 0.51)',
      //   borderColor: 'red',
      //   pointBackgroundColor: 'rgba(148,159,177,1)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      //   fill: 'origin',
      // },
    ],
    labels: [],
  };
}
