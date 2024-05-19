import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ConfirmmailComponent } from './confirmmail/confirmmail.component';
import { EmailConfirmedGuard } from 'src/app/core/guards/email-confirmed.guard';
import { InverseAuthGuard } from 'src/app/core/guards/inverse-auth.guard';
import { Login2Component } from './login2/login2.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { Recoverpwd2Component } from './recoverpwd2/recoverpwd2.component';
import { Register2Component } from './register2/register2.component';
import { SignupComponent } from './signup/signup.component';
import { VerificationComponent } from './verification/verification.component';
import { WholesaleFormComponent } from './wholesale-form/wholesale-form.component';
import { PendingWholesaleComponent } from './pending-wholesale/pending-wholesale.component';
import { RoleGuard } from 'src/app/core/guards/role.guard';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [InverseAuthGuard],
    },
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [InverseAuthGuard],
    },
    {
        path: 'signup-2',
        component: Register2Component,
        canActivate: [InverseAuthGuard],
    },
    {
      path: 'company-signup',
      component: SignupComponent,
      canActivate: [InverseAuthGuard],
    },
    {
        path: 'reset-password',
        component: PasswordresetComponent,
        canActivate: [InverseAuthGuard],
    },
    {
        path: 'recoverpwd-2',
        component: Recoverpwd2Component,
        canActivate: [InverseAuthGuard],
    },
    {
        path: 'login-2',
        component: Login2Component,
        canActivate: [InverseAuthGuard],
    },
    {
        path: 'email-verification',
        component: VerificationComponent,
        canActivate: [EmailConfirmedGuard],
        data: { roles: ['SINGLE_USER', 'TENANT_ADMIN','WHOLESALE_USER'], confirmed: false }
    },
    {
        path: 'confirm-mail',
        component: ConfirmmailComponent,
        canActivate: [EmailConfirmedGuard],
        data: { roles: ['SINGLE_USER', 'TENANT_ADMIN','WHOLESALE_USER'], confirmed: true }
    },
    {
        path: 'wholesale-form',
        component: WholesaleFormComponent,
        canActivate: [InverseAuthGuard],
        

    },
    {
        path: 'wholesale-pending',
        component: PendingWholesaleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
