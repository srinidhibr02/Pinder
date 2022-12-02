import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'feeds',
        loadChildren: () => import('../home/feeds/feeds.module').then( m => m.FeedsPageModule)
      },
      {
        path: 'mates',
        loadChildren: () => import('../home/mates/mates.module').then( m => m.MatesPageModule)
      },
      {
        path: 'add-post',
        loadChildren: () => import('../home/add-post/add-post.module').then( m => m.AddPostPageModule)
      },
      {
        path: 'todos',
        loadChildren: () => import('../home/todos/todos.module').then( m => m.TodosPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../home/profile/profile.module').then( m => m.ProfilePageModule)
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
export class TabsPageRoutingModule {}
