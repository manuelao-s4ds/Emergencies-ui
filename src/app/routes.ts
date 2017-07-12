import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard/auth-guard.guard';
import { MainWindowComponent } from './main-window/main-window.component';
import { EmergencyComponent } from './emergency/emergency.component';


export const routeConfig: Routes = [
    {
      path: '',
      canActivate: [],
      children: [
        {
          path: '',
          component: MainWindowComponent,
          children: [
            {
              path: 'emergencias',
              component: EmergencyComponent
            }
          ]
        }
      ]
    }
];
