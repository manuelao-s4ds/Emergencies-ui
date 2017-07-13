import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { routeConfig } from './routes';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './auth-guard/auth-guard.guard';
import { Oauthv2TokenHandlerService } from './oauthv2-token-handler/oauthv2-token-handler.service';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { HttpService } from './lib/HttpClient';
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';

import 'hammerjs';

import { AppComponent } from './app.component';
import { MainWindowComponent } from './main-window/main-window.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { EmergencyComponent } from './emergency/emergency.component';
import { TableEmergenciesComponent } from './table-emergencies/table-emergencies.component';
import { ModalEditEmergenciesComponent } from './modal-edit-emergencies/modal-edit-emergencies.component';
import { AmbulancesComponent } from './ambulances/ambulances.component';

@NgModule({
  declarations: [
    AppComponent,
    MainWindowComponent,
    ContactListComponent,
    EmergencyComponent,
    TableEmergenciesComponent,
    ModalEditEmergenciesComponent,
    AmbulancesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routeConfig, {useHash: true}),
    HttpModule,
    MaterialModule,
    ReactiveFormsModule,
    ToastModule.forRoot()
  ],
  providers: [AuthGuard, Oauthv2TokenHandlerService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
