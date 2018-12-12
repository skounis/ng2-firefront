import { NgxUnlayerModule } from './ngx-unlayer.module';

describe('NgxUnlayerModule', () => {
  let ngxUnlayerModule: NgxUnlayerModule;

  beforeEach(() => {
    ngxUnlayerModule = new NgxUnlayerModule();
  });

  it('should create an instance', () => {
    expect(ngxUnlayerModule).toBeTruthy();
  });
});
