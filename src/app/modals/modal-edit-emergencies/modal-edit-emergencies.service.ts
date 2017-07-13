import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import {ModalEditEmergenciesComponent} from './modal-edit-emergencies.component';

@Injectable()
export class ModalEditEmergenciesService {

  private dialogRef: MdDialogRef<ModalEditEmergenciesComponent>;
  private configModal: any;

  constructor(private _mdDialog: MdDialog) {
    this.setConfigModal();
  }

  public openModal(title: string, data: any): Observable<boolean> {

    this.dialogRef = this._mdDialog.open(ModalEditEmergenciesComponent, this.configModal);
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
