import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import { EmergencyService } from '../emergency/emergency-service';
import { ModalEditEmergenciesService } from '../../modals/modal-edit-emergencies/modal-edit-emergencies.service';

@Component({
  selector: 'app-table-emergencies',
  templateUrl: './table-emergencies.component.html',
  styleUrls: ['./table-emergencies.component.css'],
  providers: [ModalEditEmergenciesService, EmergencyService]
})
export class TableEmergenciesComponent implements OnInit {

  public emergencies: any [];
  public titleModal: string;

  constructor(
    private _emergencyService: EmergencyService,
    private _container: ViewContainerRef,
    private _toast: ToastsManager,
    private _modalEditEmergenciesService: ModalEditEmergenciesService
  ) {
    this.emergencies = [];
    this.titleModal = '';
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.titleModal = 'Modificar Emergencia';
    this.getEmergencies();
  }
  getEmergencies() {
    this._emergencyService.list().subscribe(
      (res) => {
        this.emergencies = res.json();
      },
      (err) => {
        console.log(err.json());
      }
    );
  }

  openModal(data) {
    this._modalEditEmergenciesService.openModal(this.titleModal, data)
      .subscribe(
        (res: any) => {
          if (res.valid) {
            this._emergencyService.update(res.emergency).subscribe(
              (response) => {
                this.getEmergencies();
                this._toast.success(`Se actualizó la emergencia`, 'Emergencias!');
              },
              (error) => {
                console.log(error.json());
              }
            );
          }
        }
      );
  }
  delete(emergency) {
    this._emergencyService.delete(emergency._id).subscribe(
      (response) => {
        this.getEmergencies();
        this._toast.success(`Se elimino la emergencia`, 'Emergencias!');
      },
      (error) => {
        console.log(error.json());
      }
    );
  }

}
