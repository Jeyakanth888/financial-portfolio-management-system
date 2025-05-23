import { Component } from '@angular/core';
import { BarChartComponent } from '../../shared/bar-chart/bar-chart.component';
import { CardTileComponent } from '../../shared/card-tile/card-tile.component';
import { SparklineChartComponent } from '../../shared/sparkline-chart/sparkline-chart.component';
import { PieChartComponent } from "../../shared/pie-chart/pie-chart.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardTileComponent, BarChartComponent, PieChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userOverViewData: any = [];
  barChartData: any = [];
  barChartTitle = "Portfolio Status";
  currentDataPoint: any = null;
  sparklineData: any = [];
  pieChartData: any = [];

  constructor() {

  }

  ngOnInit() {
    this.sparklineData = [
      {
        id: 1,
        x: '1 Minute Ago',
        y: 25
      },
      {
        id: 2,
        x: '5 Minute Ago',
        y: 20
      },
      {
        id: 3,
        x: '10 Minute Ago',
        y: 35
      },
      {
        id: 4,
        x: '15 Minute Ago',
        y: 17
      },
      {
        id: 5,
        x: '20 Minute Ago',
        y: 17
      },
      {
        id: 6,
        x: '25 Minute Ago',
        y: 22
      },
    ];
    this.userOverViewData = [{
      title: "total investment amount",
      content: 1000380,
      type: "amount"
    },
    {
      title: "investments",
      content: 1200,
      type: "amount"
    },
    {
      title: "rate of interests",
      content: "0.04",
      type: "percentage"
    },
    {
      title: "risks-identified",
      content: 5,
      type: "count"
    },
    {
      title: "initiatives-in review",
      content: 15,
      type: "count"
    },
    {
      title: "initiatives-approved",
      content: 25,
      type: "count"
    }
    ];

    this.barChartData = [
      { name: "Portfolio-1", value: "200", color: "#9954E6" },
      { name: "Portfolio-2", value: "100", color: "#63adfeb3" },
      { name: "Portfolio-3", value: "500", color: "#533a84" },
      { name: "Portfolio-4", value: "300", color: "#dd8050c4" },
      { name: "Portfolio-5", value: "50", color: "#BF60C4" }
    ];

    this.pieChartData = [
      { name: "Portfolio-1", value: "30", color: "#9954E6" },
      { name: "Portfolio-2", value: "25", color: "#63adfeb3" },
      { name: "Portfolio-3", value: "20", color: "#533a84" },
      { name: "Portfolio-4", value: "10", color: "#dd8050c4" },
      { name: "Portfolio-5", value: "15", color: "#BF60C4" }
    ];

   
  }

  onDataPointHovered(data: any) {
    this.currentDataPoint = data;
  }

  generateData() {

  }
}
