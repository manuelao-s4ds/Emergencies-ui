import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import { AmbulanceService } from '../ambulance/ambulances-service';
import { ModalEditAmbulancesService } from '../../modals/modal-edit-ambulances/modal-edit-ambulances.service';

@Component({
  selector: 'app-table-ambulances',
  templateUrl: './table-ambulances.component.html',
  styleUrls: ['./table-ambulances.component.css'],
  providers: [ModalEditAmbulancesService, AmbulanceService]
})
export class TableAmbulancesComponent implements OnInit {

  public ambulances: any [];
  public search: string;
  public titleModal: string;
  public totalPages: number;
  public color: string;
  public nextPage: string;
  public previusPage: string;
  public numberRegistre: number;
  public numberPages: number;
  public configModal: any;

  constructor(
  	private _ambulanceService: AmbulanceService,
    private _container: ViewContainerRef,
    private _toast: ToastsManager,
    private _ModalEditAmbulancesService: ModalEditAmbulancesService) {
	    this.ambulances = [];
	    this.search = '';
	    this.color = '';
	    this.titleModal = '';
	    this.totalPages = 0;
	    this.nextPage = '';
	    this.previusPage = '';
	    this.numberRegistre = 0;
	    this.numberPages = 0;
	    this._toast.setRootViewContainerRef(_container);
    }

  ngOnInit() {
  	this.titleModal = 'Modificar Ambulancias';
    this.getAmbulances();
  }
  getAmbulances() {
    this._ambulanceService.list().subscribe(
      (res) => {
        this.ambulances = res.json();
      },
      (err) => {
        console.log(err.json());
      }
    );
  }
  openModal(data) {
    this._ModalEditAmbulancesService.openModal(this.titleModal, data)
      .subscribe(
        (res: any) => {
          debugger
          if (res.valid) {
            this._ambulanceService.update(res.ambulance).subscribe(
              (response) => {
                this.getAmbulances();
                this._toast.success(`Se actualizó la ambulancia`, 'Emergencias!');
              },
              (error) => {
                console.log(error.json());
              }
            );
          }
        }
      );
  }
  delete(ambulances) {
    debugger
    this._ambulanceService.delete(ambulances._id).subscribe(
      (response) => {
        this.getAmbulances();
        this._toast.success(`Se elimino la ambulancia `, 'Emergencias!');
      },
      (error) => {
        console.log(error.json());
      }
    );
  }


}
