import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: "dashboard",
        pathMatch: "full"
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'reports',
        loadChildren: () => import('./user-performance-reports/user-performance-reports.module').then(m => m.UserPerformanceReportsModule)
    },
    {
        path: 'investments',
        loadChildren: () => import('./user-investments/user-investments.module').then(m => m.UserInvestmentsModule)
    }
];
