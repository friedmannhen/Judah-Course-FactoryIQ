import { Component } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule,MatListModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public sidebarOpen$: Observable<boolean>;

  constructor(private uiService: UiService) {
    this.sidebarOpen$ = this.uiService.getSidebarOpen();
  }

  ngOnInit(): void {}
}
