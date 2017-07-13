import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAmbulancesComponent } from './table-ambulances.component';

describe('TableAmbulancesComponent', () => {
  let component: TableAmbulancesComponent;
  let fixture: ComponentFixture<TableAmbulancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAmbulancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAmbulancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
