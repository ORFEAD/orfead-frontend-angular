import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './service/auth-guard-service.service';
import { LoginComponent } from './component/page/login/login.component';
import { DashboardComponent } from './component/dashboard-elts/dashboard/dashboard.component';
import { ChoixVariableAVerifierComponent } from './component/page/choix-variable-a-verifier/choix-variable-a-verifier.component';
import { VerificationVariableComponent } from './component/page/verification-variable/verification-variable.component';
import { UtilisateursComponent } from './component/page/utilisateurs/utilisateurs.component';
import { UtilisateurComponent } from './component/page/utilisateur/utilisateur.component';

const routes: Routes = [
  // { path: 'deals', component: DealsComponent},
  { path: 'login', component: LoginComponent },   
  { path: 'utilisateurs', component: UtilisateursComponent, canActivate: [AuthGuardService] },      
  { path: 'user/:id', component: UtilisateurComponent, canActivate: [AuthGuardService] }, 
  // { path: 'check-variable/:dataset_id/:variable_id', component: CheckVariableComponent, canActivate: [AuthGuardService] }, 
  { path: 'check-variable/:dataset_id/:variable_id', component: VerificationVariableComponent, canActivate: [AuthGuardService] }, 
  // { path: 'settings/roles', component: RolesComponent, canActivate: [AuthGuardService] },
  { path: 'choix-variable-a-verifier', component: ChoixVariableAVerifierComponent, canActivate: [AuthGuardService] },
  { path: 'verification-variable/:dataset_id/:variable_id/:final-checks-only', component: VerificationVariableComponent, canActivate: [AuthGuardService] },
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
