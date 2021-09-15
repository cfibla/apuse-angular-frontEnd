import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEeAlumneComponent } from './modal-ee-alumne.component';

describe('ModalEeAlumneComponent', () => {
  let component: ModalEeAlumneComponent;
  let fixture: ComponentFixture<ModalEeAlumneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEeAlumneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEeAlumneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
