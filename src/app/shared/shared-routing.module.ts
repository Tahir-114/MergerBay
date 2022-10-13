import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../feature/main/main/main.component';
import { LoginRegisterMessageComponent } from './login-register-message/login-register-message.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'add-proposition',
    component: LoginRegisterMessageComponent,
  },
  // {
  //   path: '**', redirectTo: 'home'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
