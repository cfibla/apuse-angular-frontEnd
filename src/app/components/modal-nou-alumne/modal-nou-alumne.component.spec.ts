import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNouAlumneComponent } from './modal-nou-alumne.component';

describe('ModalNouAlumneComponent', () => {
  let component: ModalNouAlumneComponent;
  let fixture: ComponentFixture<ModalNouAlumneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNouAlumneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNouAlumneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
