import { Component } from '@angular/core';
import { CommonTableComponent } from "../../shared/common-table/common-table.component";
import { SharedServiceService } from '../../shared/shared-service.service';
import { AddInvestmentsComponent } from '../add-investments/add-investments.component';
import { CommonModule } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [CommonTableComponent, CommonModule],
  providers: [BsModalService],
  templateUrl: './investments.component.html',
  styleUrl: './investments.component.scss'
})
export class InvestmentsComponent {
  bsModalRef: BsModalRef | undefined;
  userInvestmentDetails: any = [];
  userInvestmentHeader: any = [{
    id: "id",
    text: "No"
  }, {
    id: "assetType",
    text: "Asset Type"
  }, {
    id: "quanity",
    text: "Quantity"
  }, {
    id: "price",
    text: "Purchase Price"
  }, {
    id: "createdDate",
    text: "Created Date"
  },
  {
    id: "endDate",
    text: "End Date"
  }
  ];

  userStatusDetails: any = [{ name: "Portfolio-1", status: "active", trend: "high" },
  { name: "Portfolio-2", status: "high", trend: "high" },
  { name: "Portfolio-3", status: "medium", trend: "low" },
  { name: "Portfolio-4", status: "low", trend: "medium" },
  { name: "Portfolio-5", status: "high", trend: "low" }];
  userStatusHeader: any = [{
    id: "name",
    text: "Name"
  }, {
    id: "status",
    text: "Status"
  }, {
    id: "trend",
    text: "Trend"
  }];
  public modal = "";
  public subscription$: any;
  public subscriptionTwo$: any;
  constructor(private sharedService: SharedServiceService, private modalService: BsModalService) {

  }

  ngOnInit() {
    this.subscription$ = this.sharedService.userInvestments$.subscribe(res => {
      this.userInvestmentDetails = res;
    });

    this.subscriptionTwo$ = this.sharedService.closeAddInvestment$.subscribe(res => {
      if(res) {
          this.bsModalRef?.hide();
      }
    });
  }

  onclickAddInvestments() {
    this.bsModalRef = this.modalService.show(AddInvestmentsComponent, {
      animated: true,
      backdrop: 'static',
      class: 'modal-lg'
    });
  }

  ngOnDestroy() {
    if (this.subscription$ && this.subscription$.closed) {
      this.subscription$.unsubscribe();
    }
    if (this.subscriptionTwo$ && this.subscriptionTwo$.closed) {
      this.subscriptionTwo$.unsubscribe();
    }
  }
}
