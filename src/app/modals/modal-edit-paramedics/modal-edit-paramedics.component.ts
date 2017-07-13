import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';

@Component({
  selector: 'app-modal-edit-paramedics',
  templateUrl: './modal-edit-paramedics.component.html',
  styleUrls: ['./modal-edit-paramedics.component.css'],
  providers: []
})
export class ModalEditParamedicsComponent implements OnInit {
  public title: string;
  public errorMessage: string;
  public data: any;
  public dialogRef: MdDialogRef<ModalEditParamedicsComponent>;
  formParamedics: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.setDataForm();
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

  setDataForm() {
    this.formParamedics.setValue({
      name: this.data.name,
      lastname: this.data.lastname,
      phone: this.data.phone,
      cellPhone: this.data.cellPhone,
      gender: this.data.gender,
      birthdate: this.data.birthdate,
      specialization: this.data.specialization
    });
  }

  update() {
    const data = {
      paramedic: {},
      error: {},
      valid: false
    };
    if (this.formParamedics.valid) {
      const paramedic = {
        _id: this.data._id,
        name: this.formParamedics.get('name').value,
        lastname: this.formParamedics.get('lastname').value,
        phone: this.formParamedics.get('phone').value,
        cellPhone: this.formParamedics.get('cellPhone').value,
        gender: this.formParamedics.get('gender').value,
        birthdate: this.formParamedics.get('birthdate').value,
        specialization: this.formParamedics.get('specialization').value
      };
      data.paramedic = paramedic;
      data.valid = true;
      this.dialogRef.close(data);
    }else {
      this.errorMessage = 'Los campos marcados con * son obligatorios';
    }
  }

  closeModal() {
    const data = {
      paramedic: {},
      valid: false
    };
    this.dialogRef.close(data);
  }

}
