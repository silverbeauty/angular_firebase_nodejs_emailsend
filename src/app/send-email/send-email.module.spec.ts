import { SendEmailModule } from './send-email.module';

describe('SendEmailModule', () => {
  let sendEmailModule: SendEmailModule;

  beforeEach(() => {
    sendEmailModule = new SendEmailModule();
  });

  it('should create an instance', () => {
    expect(sendEmailModule).toBeTruthy();
  });
});
