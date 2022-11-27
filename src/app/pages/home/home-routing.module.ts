import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'feeds',
        loadChildren: () => import('./feeds/feeds.module').then( m => m.FeedsPageModule)
      },
      {
        path: 'mates',
        loadChildren: () => import('./mates/mates.module').then( m => m.MatesPageModule)
      },
      {
        path: 'add-post',
        loadChildren: () => import('./add-post/add-post.module').then( m => m.AddPostPageModule)
      },
      {
        path: 'todos',
        loadChildren: () => import('./todos/todos.module').then( m => m.TodosPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path:'',
        redirectTo:'feeds',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
