import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedServiceService } from '../../shared/shared-service.service';


@Component({
  selector: 'app-add-investments',
  standalone: true,
  imports: [CommonModule, BsDatepickerModule, ReactiveFormsModule],
  templateUrl: './add-investments.component.html',
  styleUrl: './add-investments.component.scss'
})
export class AddInvestmentsComponent {

  assets = ["Asset Test 1", "Asset Test 2", "Asset Test 3"];
  myDateValue: Date | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  assetsForm!: FormGroup;
  showErrorMessage: boolean = false;

  constructor(private sharedService: SharedServiceService,) { 
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() );
    this.maxDate.setDate(this.minDate.getDate() + 365);
  }

  ngOnInit() {
    this.assetsForm = new FormGroup({
      assetType: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      endDate: new FormControl('', [Validators.required]),
    });

    //Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
  }

  onSave() {
      if(!this.assetsForm?.invalid) {
          this.showErrorMessage = false;
          this.sharedService.addUserInvestments(this.assetsForm.value);
      } else {
        this.showErrorMessage = true;
      }
  }

  onClose() {
    this.sharedService.closeAddInvestment$.next(true);
    // this.modalRef.hide();
  }
}
