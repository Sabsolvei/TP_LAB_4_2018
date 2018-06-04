import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudRemisComponent } from './solicitud-remis.component';

describe('SolicitudRemisComponent', () => {
  let component: SolicitudRemisComponent;
  let fixture: ComponentFixture<SolicitudRemisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudRemisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudRemisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
