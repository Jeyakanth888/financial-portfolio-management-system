import { Component } from '@angular/core';
import { NavTabsComponent } from "../nav-tabs/nav-tabs.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavTabsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  activeTab = "Dashboard";
   public homeTabs = [{
      title: "Dashboard",
      path: "/dashboard"
    },
    {
    title: "Investments",
    path: "/investments"
    },
    {
      title: "Reports",
      path: "/reports"
    },
  ]
   
  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
     console.log(this.route?.snapshot);
  }
   
  onselectedTab(tab: any) {
    this.router.navigate([tab.path]);
    this.activeTab = tab.title;
  }
}
