import { SignUserModule } from './sign-user.module';

describe('SignUserModule', () => {
  let signUserModule: SignUserModule;

  beforeEach(() => {
    signUserModule = new SignUserModule();
  });

  it('should create an instance', () => {
    expect(signUserModule).toBeTruthy();
  });
});
