import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as d3 from "d3";
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

   /**
   * Generates random letter string with specified length
   * @param length: number
   */
   public d3 = d3;
  public userInvestments$ = new BehaviorSubject<any>([]);
  public closeAddInvestment$ = new BehaviorSubject<any>(false);
  public allInvestments = [
    {
      id: 1,
      assetType: "Test Asset1",
      quantity: 10,
      price: 1200,
      createdDate: "2025-05-23",
      endDate: "2025-08-30"
    },
    {
      id: 2,
      assetType: "Test Asset 2",
      quantity: 10,
      price: 1200,
      createdDate: "2025-05-23",
      endDate: "2025-08-30"
    },
    {
      id: 3,
      assetType: "Test Asset3",
      quantity: 10,
      price: 1200,
      createdDate: "2025-05-23",
      endDate: "2025-08-30"
    },
    {
      id: 4,
      assetType: "Test Asset4",
      quantity: 10,
      price: 1200,
      createdDate: "2025-05-23",
      endDate: "2025-08-30"
    },
    {
      id: 5,
      assetType: "Test Asset5",
      quantity: 10,
      price: 1200,
      createdDate: "2025-05-23:15:06:54",
      endDate: "2025-08-30"
    },
    {
      id: 6,
      assetType: "Test Asset6",
      quantity: 10,
      price: 1200,
      createdDate: "2025-05-23",
      endDate: "2025-08-30"
    }
  ];
  constructor(private datePipe: DatePipe) { 
     this.userInvestments$.next(this.allInvestments);
  }

  public generateId(length: number): string {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public addUserInvestments(value: any) {
    const createdDate = this.datePipe.transform(new Date(), 'YYYY-MM-DD');
    value.createdDate = createdDate;
    value.endDate = this.datePipe.transform(new Date(value.endDate), 'YYYY-MM-DD');
    value.id = this.allInvestments.length + 1;
    this.allInvestments.push(value);
    this.userInvestments$.next(this.allInvestments);
    this.closeAddInvestment$.next(true);
  }
}
