import { Component, Input, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { DefaultArcObject } from 'd3';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit{
  @Input() pieData: any[] = [];
  @Input() textColor: string = "#ffffff";
  @Input() isPercentage: boolean = false;
  @Input() enablePolylines: boolean = false;
  public chartId;
  private svg: any;
  private margin = 25;
  private width = 750;
  private height = 450;

  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;

  private colors: any;
  constructor(private sharedService: SharedServiceService) {
    this.chartId = this.sharedService.generateId(5);
  }

  ngOnInit() {
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = this.sharedService.d3
      .select("figure#pie")
      .append("svg")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      // .attr('width', this.width)
      //.attr('height', this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  private createColors(data = this.pieData): void {
    this.colors = this.sharedService.d3
      .scaleOrdinal()
      .domain(data.map(d => d.value.toString()))
      .range([
        "#6773f1",
        "#32325d",
        "#6162b5",
        "#6586f6",
        "#8b6ced",
        "#1b1b1b",
        "#212121"
      ]);
  }

  private drawChart(data = this.pieData): void {
    // Compute the position of each group on the pie
    const pie = this.sharedService.d3.pie<any>().value((d: any) => Number(d.value));
    const data_ready = pie(data);

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    let radius = Math.min(this.width, this.height) / 2 - this.margin;

    let outerArc = this.sharedService.d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // The arc generator
    let arc = this.sharedService.d3
      .arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    // append the svg object to the div called 'my_dataviz'

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.svg
      .selectAll("pieces")
      .data(data_ready)
      .enter()
      .append("path")
      .attr(
        "d",
        this.sharedService.d3
          .arc()
          .innerRadius(0)
          .outerRadius(this.radius)
      )
      .attr("fill", (d: { data: { color: any; }; }, i: any) => (d.data.color ? d.data.color : this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");
    // Now add the annotation. Use the centroid method to get the best coordinates
    const labelLocation = this.sharedService.d3
      .arc()
      .innerRadius(50)
      .outerRadius(this.radius);
    let dy = 0;
    let index = 0;
    this.svg
      .selectAll("pieces")
      .data(pie(data))
      .enter()
      .append("text")
      .text((d: { endAngle: number; startAngle: number; data: { name: string; value: string; }; }) : any => {
        if (
          ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100 > 5 ||
          !this.enablePolylines
        ) {
          return (
            d.data.name +
            " (" +
            d.data.value +
            (this.isPercentage ? "%" : "") +
            ")"
          );
        }
      })
      .attr("transform", (d: DefaultArcObject) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 28)
      .attr("fill", this.textColor);
    if (this.enablePolylines) {
      this.svg
        .selectAll("allLabels")
        .data(data_ready)
        .enter()
        .append("text")
        .text((d: { endAngle: number; startAngle: number; data: { name: string; value: string; }; }) => {
          if (((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100 > 5) {
            return null;
          } else {
            return (
              d.data.name +
              " (" +
              d.data.value +
              (this.isPercentage ? "%" : "") +
              ")"
            );
          }
        })
        .style("font-size", "28px")
        .attr("dy", (d: { endAngle: number; startAngle: number; }) => {
          if (((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100 > 5) {
            return null;
          } else {
            let value = 0.35;
            if (index != 0) dy = dy + 1;
            index++;
            value = value + dy;
            return value.toString() + "em";
          }
        })
        .attr("transform", (d: DefaultArcObject) => {
          if (((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100 > 5) {
            return null;
          } else {
            let pos = outerArc.centroid(d);
            let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return "translate(" + pos + ")";
          }
        })
        .style("text-anchor", (d: { startAngle: number; endAngle: number; }) => {
          let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midangle < Math.PI ? "start" : "end";
        });
      index = 0;
      let addTo = 5;
      this.svg
        .selectAll("allPolylines")
        .data(data_ready)
        .enter()
        .append("polyline")
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr("points", (d: DefaultArcObject) => {
          if (((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100 > 5) {
            return null;
          } else {
            let posA = arc.centroid(d); // line insertion in the slice
            let posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
            let posC = outerArc.centroid(d); // Label position = almost the same as posB
            let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
            posC[0] = radius * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
            posC[0] = posC[0] + addTo;
            posC[1] = posC[1] + addTo;
            addTo = addTo + 10;
            return [posA, posB, posC];
          }
        });
    }
  }
}
