import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUnlayerTemplatesComponent } from './ngx-unlayer-templates.component';

describe('NgxUnlayerTemplatesComponent', () => {
  let component: NgxUnlayerTemplatesComponent;
  let fixture: ComponentFixture<NgxUnlayerTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxUnlayerTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxUnlayerTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
