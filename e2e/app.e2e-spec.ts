import { AnalyzerWebPage } from './app.po';

describe('analyzer-web App', () => {
  let page: AnalyzerWebPage;

  beforeEach(() => {
    page = new AnalyzerWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
