import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEmergenciesComponent } from './table-emergencies.component';

describe('TableEmergenciesComponent', () => {
  let component: TableEmergenciesComponent;
  let fixture: ComponentFixture<TableEmergenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableEmergenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEmergenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
