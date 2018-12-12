import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUnlayerComponent } from './ngx-unlayer.component';

describe('NgxUnlayerComponent', () => {
  let component: NgxUnlayerComponent;
  let fixture: ComponentFixture<NgxUnlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxUnlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxUnlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
