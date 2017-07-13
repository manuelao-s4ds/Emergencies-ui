import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import { ParamedicsService } from '../paramedics/paramedics.services';
import { ModalEditParamedicsService } from '../../modals/modal-edit-paramedics/modal-edit-paramedics.service';

@Component({
  selector: 'app-table-paramedics',
  templateUrl: './table-paramedics.component.html',
  styleUrls: ['./table-paramedics.component.css'],
  providers: [ModalEditParamedicsService, ParamedicsService]
})
export class TableParamedicsComponent implements OnInit {

  public paramedics: any [];
  public titleModal: string;

  constructor(
    private _paramedicsService: ParamedicsService,
    private _container: ViewContainerRef,
    private _toast: ToastsManager,
    private _modalEditParamedicsService: ModalEditParamedicsService
  ) {
    this.paramedics = [];
    this.titleModal = '';
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.titleModal = 'Modificar Paramedico';
    this.getParamedics();
  }
  getParamedics() {
    this._paramedicsService.list().subscribe(
      (res) => {
        this.paramedics = res.json();
      },
      (err) => {
        this.paramedics = [];
        this._toast.error(`Ocurrio un error al obtener los paramedicos`, 'Paramedicos!');
        console.log(err.json());
      }
    );
  }

  openModal(data) {
    this._modalEditParamedicsService.openModal(this.titleModal, data)
      .subscribe(
        (res: any) => {
          if (res.valid) {
            this._paramedicsService.update(res.paramedic).subscribe(
              (response) => {
                this.getParamedics();
                this._toast.success(`Se actualizó el paramedico`, 'Paramedicos!');
              },
              (error) => {
                this._toast.error(`Ocurrio un error al actualuzar el paramedico`, 'Paramedicos!');
                console.log(error.json());
              }
            );
          }
        }
      );
  }
  delete(paramedic) {
    this._paramedicsService.delete(paramedic._id).subscribe(
      (response) => {
        this.getParamedics();
        this._toast.success(`Se elimino el paramedico`, 'Paramedicos!');
      },
      (error) => {
        this._toast.error(`Ocurrio un error al eliminar el paramedico`, 'Paramedicos!');
        console.log(error.json());
      }
    );
  }

}
