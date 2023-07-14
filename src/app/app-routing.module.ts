import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlistComponent} from '../app/components/userlist/userlist.component';
import { UserinfoComponent } from '../app/components/userinfo/userinfo.component';

const routes: Routes = [
  {
      path: 'user-info',
      component: UserinfoComponent
  },
  {
      path: 'user-list',
      component: UserlistComponent
  },
  { path: '',   redirectTo: '/user-info', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
