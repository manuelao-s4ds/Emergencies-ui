import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import {AmbulanceService} from '../../ambulances/ambulance/ambulances-service'; 

@Component({
  selector: 'app-modal-edit-ambulances',
  templateUrl: './modal-edit-ambulances.component.html',
  styleUrls: ['./modal-edit-ambulances.component.css'],
  providers: [AmbulanceService]
})
export class ModalEditAmbulancesComponent implements OnInit {

  public title: string;
  public errorMessage: string;
  public data: any;
  public dialogRef: MdDialogRef<ModalEditAmbulancesComponent>;
  formAmbulance: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _ambulanceService: AmbulanceService
  ) { }

  ngOnInit() {
    this.createForm();
    this.setDataForm();
  }

  createForm() {
    this.formAmbulance = this.fb.group({ // <-- the parent FormGroup
      car: ['', Validators.required ],
      car_plate: ['', Validators.required],
      type_ambulance: ['', Validators.required ],
      available: ['', Validators.required ]
    });
  }
  setDataForm() {
    this.formAmbulance.setValue({
      car: this.data.car,
      car_plate: this.data.car_plate,
      type_ambulance: this.data.type_ambulance,
      available: this.data.available
    });
  }

  update() {
    const data = {
      ambulance: {},
      error: {},
      valid: false
    };
    debugger
    if (this.formAmbulance.valid) {
      const ambulance = {
        _id: this.data._id, 
        car: this.formAmbulance.get('car').value,
        car_plate: this.formAmbulance.get('car_plate').value,
        type_ambulance: this.formAmbulance.get('type_ambulance').value,
        available: this.formAmbulance.get('available').value
      };
      this.formAmbulance.reset({
        car: '',
        car_plate: '',
        type_ambulance: '',
        available: ''
      });
      data.ambulance = ambulance;
      data.valid = true;
      this.dialogRef.close(data);
    }else {
      this.errorMessage = 'Los campos marcados con * son obligatorios';
    }
  }

  closeModal() {
    const data = {
      ambulance: {},
      valid: false
    };
    this.dialogRef.close(data);
  }

}
