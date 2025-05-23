import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss'
})
export class CommonTableComponent {
  @Input() tableData: any[] = [];
  @Input() tableHeader: any = [];
  @Input() tableType: string = "";
}
