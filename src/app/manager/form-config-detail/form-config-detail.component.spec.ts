import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfigDetailComponent } from './form-config-detail.component';

describe('FormConfigDetailComponent', () => {
  let component: FormConfigDetailComponent;
  let fixture: ComponentFixture<FormConfigDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConfigDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConfigDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
