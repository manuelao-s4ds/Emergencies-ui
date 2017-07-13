import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import {EmergencyService} from '../../emergencies/emergency/emergency-service';

@Component({
  selector: 'app-modal-edit-emergencies',
  templateUrl: './modal-edit-emergencies.component.html',
  styleUrls: ['./modal-edit-emergencies.component.css'],
  providers: [EmergencyService]
})
export class ModalEditEmergenciesComponent implements OnInit {
  public ambulances: any [];
  public paramedics: any [];
  public patients: any [];
  ambulanceSelected: any;
  driverSelected: any;
  paramedicsSelected: any [];
  public title: string;
  public errorMessage: string;
  public data: any;
  public dialogRef: MdDialogRef<ModalEditEmergenciesComponent>;
  formEmergency: FormGroup;
  formPatient: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _emergencyService: EmergencyService
  ) {
    this.paramedics = [];
    this.patients = [];
    this.ambulances = [];
    this.ambulanceSelected = {};
    this.driverSelected = {};
    this.paramedicsSelected = [];
  }

  ngOnInit() {
    this.createForm();
    this.getAmbulances();
    this.getParamedics();
    this.setDataForm();
  }

  createForm() {
    this.formEmergency = this.fb.group({ // <-- the parent FormGroup
      date: ['', Validators.required ],
      category: ['', Validators.required],
      ambulance: ['', Validators.required ],
      paramedic: ['', Validators.required ],
      driver: ['', Validators.required ],
      address: ''
    });
    this.formPatient = this.fb.group({ // <-- the parent FormGroup
      name: '',
      document: '',
      age: '',
      observation: ['', Validators.required ]
    });
  }
  addPatient() {
    if (this.formPatient.valid) {
      const patient = {
        name: this.formPatient.get('name').value,
        document: this.formPatient.get('document').value,
        age: this.formPatient.get('age').value,
        observation: this.formPatient.get('observation').value,
      };
      this.patients.push(patient);
      this.formPatient.reset();
    }
  }
  getAmbulances() {
    this._emergencyService.getAmbulances().subscribe(
      (res) => {
        this.ambulances = res.json();
      },
      (err) => {
        this.ambulances = [];
        console.log(err.json())
      }
    );
  }
  getParamedics() {
    this._emergencyService.getParamedics().subscribe(
      (res) => {
        this.paramedics = res.json();
      },
      (err) => {
        this.paramedics = [];
        console.log(err.json())
      }
    );
  }

  setDataForm() {
    this.formEmergency.setValue({
      date: this.data.date,
      category: this.data.type_emergency,
      driver: this.data.driver._id,
      ambulance: this.data.ambulance._id,
      paramedic: this.data.paramedic[0]._id,
      address: ''
    });
    this.patients = this.data.patient;
    this.driverSelected = this.data.driver;
    this.ambulanceSelected = this.data.ambulance;
    this.paramedicsSelected = this.data.paramedic;
  }

  update() {
    const data = {
      emergency: {},
      error: {},
      valid: false
    };
    if (this.formEmergency.valid) {
      const emergency = {
        _id: this.data._id,
        date: this.formEmergency.get('date').value,
        type_emergency: this.formEmergency.get('category').value,
        driver: this.driverSelected,
        ambulance: this.ambulanceSelected,
        paramedic: this.paramedicsSelected,
        patient: this.patients,
        location: this.data.location
      };
      this.formEmergency.reset({
        driver: '',
        ambulance: '',
        paramedics: ''
      });
      data.emergency = emergency;
      data.valid = true;
      this.dialogRef.close(data);
    }else {
      this.errorMessage = 'Los campos marcados con * son obligatorios';
    }
  }

  closeModal() {
    const data = {
      emergency: {},
      valid: false
    };
    this.dialogRef.close(data);
  }

  setAmbulance() {
    const ambulance = this.ambulances.filter(ambulance => ambulance._id === this.formEmergency.get('ambulance').value);
    this.ambulanceSelected = {};
    this.ambulanceSelected = ambulance[0];
  }
  setParamedics() {
    const paramedic = this.paramedics.filter(paramedic => paramedic._id === this.formEmergency.get('paramedic').value);
    this.paramedicsSelected = [];
    this.paramedicsSelected.push(paramedic[0]);
  }
  setDriver() {
    const paramedic = this.paramedics.filter(paramedic => paramedic._id === this.formEmergency.get('driver').value);
    this.driverSelected = {};
    this.driverSelected = paramedic[0];
  }

}
