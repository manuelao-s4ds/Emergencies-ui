import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import { AmbulanceService } from './ambulances-service';


@Component({
  selector: 'app-ambulances',
  templateUrl: './ambulances.component.html',
  styleUrls: ['./ambulances.component.css'],
  providers: [AmbulanceService]
})
export class AmbulancesComponent implements OnInit {

  formAmbulance: FormGroup;
  public errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private _ambulanceService: AmbulanceService,
    private _container: ViewContainerRef,
    private _toast: ToastsManager
  ) {
    this._toast.setRootViewContainerRef(_container);
  }

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
        available: this.formAmbulance.get('available').value
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
    }else {
      this._toast.info('Todos los campos marcados con * son obligatorios', 'Ambulancias!');
    }
  }
  cancel() {
    this.formAmbulance.reset();
  }

}
