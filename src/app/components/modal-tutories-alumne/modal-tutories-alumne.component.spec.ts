import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTutoriesAlumneComponent } from './modal-tutories-alumne.component';

describe('ModalTutoriesAlumneComponent', () => {
  let component: ModalTutoriesAlumneComponent;
  let fixture: ComponentFixture<ModalTutoriesAlumneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTutoriesAlumneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTutoriesAlumneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
