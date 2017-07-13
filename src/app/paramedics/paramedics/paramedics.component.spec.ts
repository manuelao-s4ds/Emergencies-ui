import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamedicsComponent } from './paramedics.component';

describe('ParamedicsComponent', () => {
  let component: ParamedicsComponent;
  let fixture: ComponentFixture<ParamedicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamedicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamedicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
