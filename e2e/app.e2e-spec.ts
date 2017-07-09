import { EmergenciesUiPage } from './app.po';

describe('emergencies-ui App', () => {
  let page: EmergenciesUiPage;

  beforeEach(() => {
    page = new EmergenciesUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
