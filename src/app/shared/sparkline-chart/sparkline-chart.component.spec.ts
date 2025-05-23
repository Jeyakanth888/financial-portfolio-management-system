import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparklineChartComponent } from './sparkline-chart.component';

describe('SparklineChartComponent', () => {
  let component: SparklineChartComponent;
  let fixture: ComponentFixture<SparklineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SparklineChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SparklineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
