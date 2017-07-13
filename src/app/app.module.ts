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
import { AmbulancesComponent } from './ambulances/ambulance/ambulances.component';
import { EmergencyComponent } from './emergencies/emergency/emergency.component';
import { TableEmergenciesComponent } from './emergencies/table-emergencies/table-emergencies.component';
import { ModalEditEmergenciesComponent } from './modals/modal-edit-emergencies/modal-edit-emergencies.component';
import { TableAmbulancesComponent } from './ambulances/table-ambulances/table-ambulances.component';
import { ModalEditAmbulancesComponent } from './modals/modal-edit-ambulances/modal-edit-ambulances.component';
import { ParamedicsComponent } from './paramedics/paramedics/paramedics.component';
import { TableParamedicsComponent } from './paramedics/table-paramedics/table-paramedics.component';
import { ModalEditParamedicsComponent } from './modals/modal-edit-paramedics/modal-edit-paramedics.component';

@NgModule({
  declarations: [
    AppComponent,
    MainWindowComponent,
    ContactListComponent,
    EmergencyComponent,
    TableEmergenciesComponent,
    ModalEditEmergenciesComponent,
    AmbulancesComponent,
    TableAmbulancesComponent,
    ModalEditAmbulancesComponent,
    ModalEditEmergenciesComponent,
    ParamedicsComponent,
    TableParamedicsComponent,
    ModalEditParamedicsComponent
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
  entryComponents: [
    ModalEditEmergenciesComponent,
    ModalEditAmbulancesComponent,
    ModalEditParamedicsComponent
  ],
  providers: [AuthGuard, Oauthv2TokenHandlerService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
