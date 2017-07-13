import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulancesComponent } from './ambulances.component';

describe('AmbulancesComponent', () => {
  let component: AmbulancesComponent;
  let fixture: ComponentFixture<AmbulancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbulancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbulancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
