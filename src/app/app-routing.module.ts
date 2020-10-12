import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './service/auth-guard-service.service';
import { LoginComponent } from './component/login/login.component';
import { UserDetailsComponent } from './component/user/user-details/user-details.component';
import { UsersComponent } from './component/user/users/users.component';
import { RolesComponent } from './component/settings/roles/roles.component';
import { DashboardComponent } from './component/dashboard-elts/dashboard/dashboard.component';
import { DataQualificationHomeComponent } from './component/data-qualification/data-qualification-home/data-qualification-home.component';
// import { CheckVariableComponent } from './component/data-qualification/check-variable/check-variable.component';
import { ChoixVariableAVerifierComponent } from './component/page/choix-variable-a-verifier/choix-variable-a-verifier.component';
import { VerificationVariableComponent } from './component/page/verification-variable/verification-variable.component';

const routes: Routes = [
  // { path: 'deals', component: DealsComponent},
  { path: 'login', component: LoginComponent },   
  { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },      
  { path: 'user/:id', component: UserDetailsComponent, canActivate: [AuthGuardService] }, 
  // { path: 'check-variable/:dataset_id/:variable_id', component: CheckVariableComponent, canActivate: [AuthGuardService] }, 
  { path: 'check-variable/:dataset_id/:variable_id', component: VerificationVariableComponent, canActivate: [AuthGuardService] }, 
  { path: 'settings/roles', component: RolesComponent, canActivate: [AuthGuardService] },
  { path: 'data-qualification', component: DataQualificationHomeComponent, canActivate: [AuthGuardService] },
  { path: 'choix-variable-a-verifier', component: ChoixVariableAVerifierComponent, canActivate: [AuthGuardService] },
  { path: 'verification-variable/:dataset_id/:variable_id', component: VerificationVariableComponent, canActivate: [AuthGuardService] },
  { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    
  // otherwise redirect to home
  { path: '**', redirectTo: '' }  
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
