import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestmentsComponent } from './add-investments.component';

describe('AddInvestmentsComponent', () => {
  let component: AddInvestmentsComponent;
  let fixture: ComponentFixture<AddInvestmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInvestmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
