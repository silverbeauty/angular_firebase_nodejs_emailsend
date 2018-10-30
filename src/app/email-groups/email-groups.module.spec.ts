import { EmailGroupsModule } from './email-groups.module';

describe('EmailGroupsModule', () => {
  let emailGroupsModule: EmailGroupsModule;

  beforeEach(() => {
    emailGroupsModule = new EmailGroupsModule();
  });

  it('should create an instance', () => {
    expect(emailGroupsModule).toBeTruthy();
  });
});
