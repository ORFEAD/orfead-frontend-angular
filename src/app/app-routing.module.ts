import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './service/auth-guard-service.service';
import { LoginComponent } from './component/login/login.component';
import { UserDetailsComponent } from './component/user/user-details/user-details.component';
import { UsersComponent } from './component/user/users/users.component';
import { RolesComponent } from './component/settings/roles/roles.component';
import { DashboardComponent } from './component/dashboard-elts/dashboard/dashboard.component';

const routes: Routes = [
  // { path: 'deals', component: DealsComponent},
  { path: 'login', component: LoginComponent },   
  { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },      
  { path: 'user/:id', component: UserDetailsComponent, canActivate: [AuthGuardService] }, 
  { path: 'settings/roles', component: RolesComponent, canActivate: [AuthGuardService] },
  { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
//    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    
    // otherwise redirect to home
    { path: '**', redirectTo: '' }  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
