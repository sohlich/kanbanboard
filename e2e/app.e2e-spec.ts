import { KanbanPage } from './app.po';

describe('kanban App', () => {
  let page: KanbanPage;

  beforeEach(() => {
    page = new KanbanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
