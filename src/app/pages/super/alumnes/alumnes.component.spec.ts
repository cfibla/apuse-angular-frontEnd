import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnesComponent } from './alumnes.component';

describe('AlumnesComponent', () => {
  let component: AlumnesComponent;
  let fixture: ComponentFixture<AlumnesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
