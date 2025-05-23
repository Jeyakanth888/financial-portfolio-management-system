import { Component, ElementRef, Input, ViewChild, AfterViewInit, Output, EventEmitter, HostListener } from '@angular/core';
import { scaleLinear, scaleBand, NumberValue } from 'd3-scale';
import { extent as d3_extent } from 'd3-array';
import { line as d3_line, curveMonotoneX } from 'd3-shape';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

const RESIZE_RENDER_DEBOUSE_TIME = 1000;

@Component({
  selector: 'app-sparkline-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sparkline-chart.component.html',
  styleUrl: './sparkline-chart.component.scss'
})
export class SparklineChartComponent implements AfterViewInit {

    private _subscriptions = new Subscription();
    private _recalculateLayout$ = new Subject<void>();
  
    width: any;
    height: any;
    linePath: any ;
    circles: any;
  
    @Input() idProperty = 'id';
    @Input() xValue = 'x';
    @Input() yValue = 'y';
    @Input() data: any  = [];
    @Input() radius = 3;
    @Input() padding = 5;
  
    @Output() dataPointClicked = new EventEmitter<any>();
    @Output() dataPointHover = new EventEmitter<any>();
  
    @ViewChild('svgContainer', { static: false, read: ElementRef }) svgContainer: ElementRef<HTMLDivElement> | undefined;
  
    @HostListener('window:resize', ['$event'])
    onResize() {
      this._recalculateLayout$.next();
    }
  
    constructor(private elementRef: ElementRef) {
      this._recalculateLayout$
        .pipe(debounceTime(RESIZE_RENDER_DEBOUSE_TIME))
        .subscribe(() => {
          this._render();
        });
    }
  
    ngAfterViewInit() {
      this._recalculateLayout$.next();
    }
  
    private _render() {
      this.width = this.svgContainer?.nativeElement.offsetWidth;
      this.height = this.svgContainer?.nativeElement.offsetHeight;
      
      // Define Scale
      const xData = this.data.map((entity: any, index: number) => `${index}`);
      const [yMinValue, yMaxValue] = d3_extent(this.data, (entity: any) => +entity[this.yValue]);
  
      const bandwidth = scaleBand().domain(xData).rangeRound([0, this.width]).bandwidth();
      const xScale = scaleBand().domain(xData).rangeRound([0, this.width + bandwidth - 5]);
      const yScale = scaleLinear().domain([Number(yMinValue), Number(yMaxValue)]).rangeRound([this.height - 10, 0]);

  
      const linePath = d3_line<any>()
        .curve(curveMonotoneX)
        // .x((i) => {
        //   const xScaleValue = xScale('' + i); // d[this.xValue]);
        //   return xScaleValue;
        // })
        .y((d, i) => {
          const yScaleValue = +yScale(d[this.yValue]);
          return yScaleValue;
        });
  
  
      this.linePath = linePath(this.data);
  
      this.circles = this.data.map((d: { [x: string]: NumberValue; }, i: string) => {
        return {
          id: d[this.idProperty],
          cx: xScale('' + i), // d[this.xValue]),
          cy: yScale(d[this.yValue]),
          radius: this.radius,
          data: d
        };
      });
    }
  
    circleTrackBy(index: number, entity: any) {
      return entity[this.idProperty] || index;
    }
  
    onDataPointClicked(data: any) {
      this.dataPointClicked.emit(data);
    }
  
    onDataPointHover(data: any) {
      this.dataPointHover.emit(data);
    }
}
