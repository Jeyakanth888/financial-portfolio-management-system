import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
  @Input() barData: any;
  @Input() title: any;

  public d3 = d3;
  public chartId;
  private highestValue: string | undefined;
  private svg: any;
  private margin = 100;
  private width = 750 - this.margin * 2;
  private height = 600 - this.margin * 2;
  constructor() {
    this.chartId = this.generateId(5);
  }

  ngOnInit(): void {
    // determining highest value
    let highestCurrentValue = 0;
    let tableLength = this.barData.length;
    this.barData.forEach((data: any, i: number) => {
      const barValue = Number(data.value);
      if (barValue > highestCurrentValue) {
        highestCurrentValue = barValue;
      }
      if (tableLength == i + 1) {
        this.highestValue = highestCurrentValue.toString();
      }
    });
  }

  ngAfterViewInit(): void {
    this.createSvg();
    this.drawBars(this.barData);
  }

  private createSvg(): void {
    this.svg = this.d3
      .select("div#chart")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${this.width + this.margin * 2} ${this.height + this.margin * 2}`
      )

      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Creating X-axis band scale
    const x = this.d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.name))
      .padding(0.2);

    // Drawing X-axis on the DOM
    this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.d3.axisBottom(x))
      .selectAll("text")
      // .attr('transform', 'translate(-10, 0)rotate(-45)')
      // .style('text-anchor', 'end')
      .style("font-size", "14px");

    // Creaate Y-axis band scale
    const y = this.d3
      .scaleLinear()
      .domain([0, Number(this.highestValue) + 50])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg
      .append("g")
      .call(this.d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "14px");

    // Create and fill the bars
    this.svg
      .selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: { name: string; }) => x(d.name))
      .attr("y", (d: { value: d3.NumberValue; }) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d: { value: d3.NumberValue; }) =>
        y(d.value) < this.height ? this.height - y(d.value) : this.height
      ) // this.height
      .attr("fill", (d: { color: any; }) => d.color);

    this.svg
      .selectAll("text.bar")
      .data(data)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "#70747a")
      .attr("x", (d: { name: string; }) => x(d.name))
      .attr("y", (d: { value: d3.NumberValue; }) => y(d.value) - 5)
      .text((d: { value: number; }) => Math.round(d.value * 100) / 100);
  }

  public generateId(length: number): string {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
