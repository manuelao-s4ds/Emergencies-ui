import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditParamedicsComponent } from './modal-edit-paramedics.component';

describe('ModalEditParamedicsComponent', () => {
  let component: ModalEditParamedicsComponent;
  let fixture: ComponentFixture<ModalEditParamedicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditParamedicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditParamedicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
