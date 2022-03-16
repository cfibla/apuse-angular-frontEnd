import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlistaAssistenciaComponent } from './llista-assistencia.component';

describe('LlistaAssistenciaComponent', () => {
  let component: LlistaAssistenciaComponent;
  let fixture: ComponentFixture<LlistaAssistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlistaAssistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlistaAssistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
