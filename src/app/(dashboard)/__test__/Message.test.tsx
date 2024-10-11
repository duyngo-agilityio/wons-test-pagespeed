// Page
import MessagesPage from '../messages/page';

describe('Message page', () => {
  it('should match snapshot', () => {
    const { container } = testLibJestUtils.render(<MessagesPage />);

    expect(container).toMatchSnapshot();
  });
});
