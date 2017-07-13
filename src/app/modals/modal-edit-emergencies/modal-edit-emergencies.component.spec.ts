import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditEmergenciesComponent } from './modal-edit-emergencies.component';

describe('ModalEditEmergenciesComponent', () => {
  let component: ModalEditEmergenciesComponent;
  let fixture: ComponentFixture<ModalEditEmergenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditEmergenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditEmergenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
