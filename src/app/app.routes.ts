import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/auth/signup/signup.component').then(
        (mod) => mod.SignupComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./threejs/snowflake/snowflake.component').then(
            (mod) => mod.SnowflakeComponent
          ),
        outlet: 'snowflake',
      },
    ],
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/auth/signin/signin.component').then(
        (mod) => mod.SigninComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./pages/main/main.component').then((mod) => mod.MainComponent),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (mod) => mod.ProfileComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'group/{:groupID}',
    loadComponent: () =>
      import('./pages/group-messages/group-messages.component').then(
        (mod) => mod.GroupMessagesComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'snowflake',
    loadComponent: () =>
      import('./threejs/snowflake/snowflake.component').then(
        (mod) => mod.SnowflakeComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (mod) => mod.NotFoundComponent
      ),
  },
];
