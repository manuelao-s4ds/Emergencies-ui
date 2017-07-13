import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard/auth-guard.guard';
import { MainWindowComponent } from './main-window/main-window.component';
import { AmbulancesComponent } from './ambulances/ambulance/ambulances.component';
import { EmergencyComponent } from './emergencies/emergency/emergency.component';
import { TableEmergenciesComponent } from './emergencies/table-emergencies/table-emergencies.component';
import { TableAmbulancesComponent } from './ambulances/table-ambulances/table-ambulances.component';

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
              path: 'ambulancias',
              component: AmbulancesComponent
            },
            {
              path: 'listado-emergencias',
              component: TableEmergenciesComponent
            },
            {
              path: 'listado-ambulancias',
              component: TableAmbulancesComponent
            }
          ]
        }
      ]
    }
];
