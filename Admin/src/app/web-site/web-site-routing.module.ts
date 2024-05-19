import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { NgModule } from '@angular/core';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { TermsUseComponent } from './pages/terms-use/terms-use.component';
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'meta',
    component: LayoutComponent,
    children: [
      {
        path: 'terms-use',
        component: TermsUseComponent,
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebSiteRoutingModule { }
