import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, provideRouter } from '@angular/router';
import { InvestmentsComponent } from './investments/investments.component';

export const routes: Routes = [
  {
      path:"",
      component: InvestmentsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [provideRouter(routes)],
})
export class UserInvestmentsModule { }
