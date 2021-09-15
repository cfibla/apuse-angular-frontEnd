import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDadesAlumneComponent } from './modal-dades-alumne.component';

describe('ModalDadesAlumneComponent', () => {
  let component: ModalDadesAlumneComponent;
  let fixture: ComponentFixture<ModalDadesAlumneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDadesAlumneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDadesAlumneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
