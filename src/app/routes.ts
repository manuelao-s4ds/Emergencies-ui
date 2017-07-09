import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './auth-guard/auth-guard.guard';


export const routeConfig: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
        ]
    }
];
