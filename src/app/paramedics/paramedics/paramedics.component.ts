import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ParamedicsService } from './paramedics.services';

@Component({
  selector: 'app-emergency',
  templateUrl: './paramedics.component.html',
  styleUrls: ['./paramedics.component.css'],
  providers: [ParamedicsService]
})
export class ParamedicsComponent implements OnInit {

  formParamedics: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _paramedicsService: ParamedicsService,
    private _container: ViewContainerRef,
    private _toast: ToastsManager
  ) {
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formParamedics = this.fb.group({ // <-- the parent FormGroup
      name: ['', Validators.required ],
      lastname: ['', Validators.required],
      phone: '',
      cellPhone: ['', Validators.required ],
      gender: ['', Validators.required ],
      birthdate: '',
      specialization: ['', Validators.required ]
    });
  }
  save() {
    if (this.formParamedics.valid) {
      const paramedic = {
        name: this.formParamedics.get('name').value,
        lastname: this.formParamedics.get('lastname').value,
        phone: this.formParamedics.get('phone').value,
        cellPhone: this.formParamedics.get('cellPhone').value,
        gender: this.formParamedics.get('gender').value,
        birthdate: this.formParamedics.get('birthdate').value,
        specialization: this.formParamedics.get('specialization').value
      };
      this._paramedicsService.save(paramedic).subscribe(
        (res) => {
          this._toast.success(`Se registro el paramedico ${res.json().name}`, 'Paramedicos!');
          this.formParamedics.reset({
            gender: ''
          })
        },
        (error) => {
          console.log(error.json());
          this._toast.error(`Ocurrio un error al registrar al paramedico`, 'Paramedicos!');
        }
      );
    }else {
      this._toast.info(`Todos los campos marcados con * son obligatorios`, 'Paramedicos!');

    }
  }

}
