import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard/auth-guard.guard';
import { MainWindowComponent } from './main-window/main-window.component';
import { ParamedicsComponent } from './paramedics/paramedics/paramedics.component';
import { EmergencyComponent } from './emergencies/emergency/emergency.component';
import { TableParamedicsComponent } from './paramedics/table-paramedics/table-paramedics.component';
import { TableEmergenciesComponent } from './emergencies/table-emergencies/table-emergencies.component';


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
            },
            {
              path: 'listado-emergencias',
              component: TableEmergenciesComponent
            },
            {
              path: 'paramedicos',
              component: ParamedicsComponent
            },
            {
              path: 'listado-paramedicos',
              component: TableParamedicsComponent
            }
          ]
        }
      ]
    }
];
