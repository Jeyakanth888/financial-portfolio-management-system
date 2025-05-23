import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-tabs.component.html',
  styleUrl: './nav-tabs.component.scss'
})
export class NavTabsComponent {
  @Input() tabLists: any[] = [];
  @Input() currentActiveTab: string = "";
  @Output() selectedTab = new EventEmitter<any>();
   constructor() {

   }

   onclickTab(event: any) {
      this.selectedTab.emit(event);
   }
}
