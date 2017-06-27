import { Ng2BetPage } from './app.po';

describe('ng2-bet App', () => {
  let page: Ng2BetPage;

  beforeEach(() => {
    page = new Ng2BetPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
