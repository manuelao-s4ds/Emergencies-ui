import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AmbulanceService } from './ambulances-service';


@Component({
  selector: 'app-ambulances',
  templateUrl: './ambulances.component.html',
  styleUrls: ['./ambulances.component.css'],
  providers: [AmbulanceService]
})
export class AmbulancesComponent implements OnInit {

  formAmbulance: FormGroup;

  constructor( private fb: FormBuilder, private _ambulanceService: AmbulanceService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formAmbulance = this.fb.group({ // <-- the parent FormGroup
      car: ['', Validators.required ],
      car_plate: ['', Validators.required],
      type_ambulance: ['', Validators.required ],
      available: ['', Validators.required ]
    });
  }

  saveAmbulance() {
    if (this.formAmbulance.valid) {
      const ambulance = {
        car: this.formAmbulance.get('car').value,
        car_plate: this.formAmbulance.get('car_plate').value,
        type_ambulance: this.formAmbulance.get('type_ambulance').value,
        available: this.formAmbulance.get('available').value == true ? "true" : "false"
      };
      this.formAmbulance.reset({
        car: '',
        car_plate: '',
        type_ambulance: '',
        available: ''
      });
      this._ambulanceService.save(ambulance).subscribe(
        (res) => {
          console.log(res.json());
        },
        (error) => {
          console.log(error.json());
        }
      );
    }
  }

}
