import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PointCloudComponent } from './components/point-cloud/point-cloud.component';
import { AuthGuard } from './guards/auth-guard/auth-guard.service';


const routes: Routes = [
  {
    path: "", 
    canActivate: [AuthGuard], 
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'pointcloud',
        component: PointCloudComponent
      },
    ]
  },
  
  {
      path: 'login',
      component: LoginComponent
  },


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
