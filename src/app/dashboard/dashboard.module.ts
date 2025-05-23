import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, provideRouter } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';


export const routes: Routes = [
  {
      path:"",
      component: DashboardComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, SharedModule,
  ],
  providers: [provideRouter(routes)],
})
export class DashboardModule { }
