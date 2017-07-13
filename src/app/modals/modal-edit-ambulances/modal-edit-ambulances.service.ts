import { Observable } from 'rxjs/Rx'; 
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import {ModalEditAmbulancesComponent} from './modal-edit-ambulances.component';

@Injectable()
export class ModalEditAmbulancesService {

  private dialogRef: MdDialogRef<ModalEditAmbulancesComponent>;
  private configModal: any;

  constructor(private _mdDialog: MdDialog) {
    this.setConfigModal();
  }

  public openModal(title: string, data: any): Observable<boolean> {

    this.dialogRef = this._mdDialog.open(ModalEditAmbulancesComponent, this.configModal);
    this.dialogRef.componentInstance.title = title;
    this.dialogRef.componentInstance.data = data;
    this.dialogRef.componentInstance.dialogRef = this.dialogRef;

    return this.dialogRef.afterClosed();
  }

  setConfigModal() {
    this.configModal = {
      disableClose: false,
      width: '750px',
      height: '',
      position: {
        top: '40px'
      }
    };
  }
}
