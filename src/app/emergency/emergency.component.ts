import { Component, OnInit } from '@angular/core';
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
  ambulanceSelected: any [];
  driverSelected: any [];
  paramedicsSelected: any [];
  positions: any [];

  constructor(
    private fb: FormBuilder,
    private _emergencyService: EmergencyService
  ) {
    this.ambulances = [];
    this.paramedics = [];
    this.patients = [];
    this.positions = [];
  }

  ngOnInit() {
    this.createForm();
    this.getAmbulances();
    this.getParamedics();
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
      this.getPosition();
      const emergency = {
        date: this.formEmergency.get('date').value,
        type_emergency: this.formEmergency.get('category').value,
        driver: this.driverSelected,
        ambulance: this.ambulanceSelected,
        paramedic: this.paramedics,
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
    }
  }
  getPosition() {
    navigator.geolocation.getCurrentPosition((data) => {
      this.positions = [data.coords.latitude, data.coords.longitude]
    })
  }
  setAmbulance(ambulance) {
    this.ambulanceSelected.push(ambulance);
  }
  setParamedics(paramedic) {
    this.paramedicsSelected.push(paramedic);
  }
  setDriver(paramedic) {
    this.driverSelected.push(paramedic);
  }

}
