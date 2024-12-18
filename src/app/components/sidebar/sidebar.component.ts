import { Component } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
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
