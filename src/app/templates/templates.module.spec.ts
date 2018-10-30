import { TemplatesModule } from './templates.module';

describe('TemplatesModule', () => {
  let templatesModule: TemplatesModule;

  beforeEach(() => {
    templatesModule = new TemplatesModule();
  });

  it('should create an instance', () => {
    expect(templatesModule).toBeTruthy();
  });
});
