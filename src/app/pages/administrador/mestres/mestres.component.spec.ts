import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MestresComponent } from './mestres.component';

describe('MestresComponent', () => {
  let component: MestresComponent;
  let fixture: ComponentFixture<MestresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MestresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MestresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
