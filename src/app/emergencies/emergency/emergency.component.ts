import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { EmergencyService } from './emergency-service';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.css'],
  providers: [EmergencyService]
})
export class EmergencyComponent implements OnInit {

  formEmergency: FormGroup;
  formPatient: FormGroup;
  ambulances: any [];
  paramedics: any [];
  patients: any [];
  ambulanceSelected: any;
  driverSelected: any;
  paramedicsSelected: any [];
  positions: any [];

  constructor(
    private fb: FormBuilder,
    private _emergencyService: EmergencyService,
    private _container: ViewContainerRef,
    private _toast: ToastsManager
  ) {
    this.ambulances = [];
    this.paramedics = [];
    this.patients = [];
    this.ambulanceSelected = {};
    this.driverSelected = {};
    this.paramedicsSelected = [];
    this.positions = [];
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.createForm();
    this.getAmbulances();
    this.getParamedics();
    this.getPosition();
  }

  createForm() {
    this.formEmergency = this.fb.group({ // <-- the parent FormGroup
      date: ['', Validators.required ],
      category: ['', Validators.required],
      ambulance: ['', Validators.required ],
      paramedic: ['', Validators.required ],
      driver: ['', Validators.required ],
      address: ['', Validators.required ]
    });
    this.formPatient = this.fb.group({ // <-- the parent FormGroup
      name: ['', Validators.required ],
      document: ['', Validators.required],
      age: ['', Validators.required ],
      observation: ['', Validators.required ]
    });
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
  saveEmergency() {
    if (this.formEmergency.valid) {
      if (this.patients.length > 0) {
        const emergency = {
          date: this.formEmergency.get('date').value,
          type_emergency: this.formEmergency.get('category').value,
          driver: this.driverSelected,
          ambulance: this.ambulanceSelected,
          paramedic: this.paramedicsSelected,
          patient: this.patients,
          location: {
            type: 'Point',
            coordinates: this.positions
          }
        };
        this.formEmergency.reset({
          driver: '',
          ambulance: '',
          paramedics: ''
        });
        this._emergencyService.save(emergency).subscribe(
          (res) => {
            console.log(res.json());
          },
          (error) => {
            console.log(error.json());
          }
        );
      }else{
        this._toast.info('Debe ingresar al menos un paciente', 'Emergencias!');
      }
    }else{
      this._toast.info('Todos los campos marcados con * son obligatorios', 'Emergencias!');
    }
  }
  getPosition() {
    navigator.geolocation.getCurrentPosition((data) => {
      this.positions = [data.coords.latitude, data.coords.longitude]
    })
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
  cacel() {
    this.formEmergency.reset({
      driver: '',
      paramedic: '',
      ambulance: ''
    });
    this.formPatient.reset();
  }

}
