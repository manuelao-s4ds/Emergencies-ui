import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import { EmergencyService } from '../emergency/emergency-service';

@Component({
  selector: 'app-table-emergencies',
  templateUrl: './table-emergencies.component.html',
  styleUrls: ['./table-emergencies.component.css']
})
export class TableEmergenciesComponent implements OnInit {

  public rawMaterials: any[];
  public pages: any [];
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
    private _emergencyService: EmergencyService,
    private _container: ViewContainerRef,
    private _toast: ToastsManager
  ) {
    this.rawMaterials = [];
    this.pages = [];
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
  }

}
