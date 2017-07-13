import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditAmbulancesComponent } from './modal-edit-ambulances.component';

describe('ModalEditAmbulancesComponent', () => {
  let component: ModalEditAmbulancesComponent;
  let fixture: ComponentFixture<ModalEditAmbulancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditAmbulancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditAmbulancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
