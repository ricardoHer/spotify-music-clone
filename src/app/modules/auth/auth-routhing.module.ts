import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCallbackComponent } from './pages/auth-callback/auth-callback.component';

const routes: Routes = [
  { path: 'callback:/auth_token', component: AuthCallbackComponent , outlet: 'app-router' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }