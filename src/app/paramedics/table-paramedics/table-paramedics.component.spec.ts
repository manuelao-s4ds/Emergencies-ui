import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableParamedicsComponent } from './table-paramedics.component';

describe('TableParamedicsComponent', () => {
  let component: TableParamedicsComponent;
  let fixture: ComponentFixture<TableParamedicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableParamedicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableParamedicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
