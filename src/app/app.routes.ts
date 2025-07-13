import { Routes } from '@angular/router';
import { LayoutComponent } from './core/posts/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'posts',
        loadComponent: () =>
          import('./domain/posts/pages/posts-page/posts-page.component').then(
            (m) => m.PostsPageComponent
          ),
      },
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
