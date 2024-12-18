import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { MachinesDashboardComponent } from './machines/machines-dashboard/machines-dashboard.component';
import { MachinesComponent } from './machines/components/machines/machines.component';
import { MachineComponent } from './machines/components/machine/machine.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'machine-statuses',
    component: MachinesDashboardComponent,
  },
  {
    path: 'machine-statuses/:department',
    component: MachinesComponent,
  },
  {
    path: 'machine-statuses/:department/:machine',
    component: MachineComponent,
  },
];
