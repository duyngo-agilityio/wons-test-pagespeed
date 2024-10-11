import NotificationPage from '../notification/page';

describe('Notification page', () => {
  it('should match snapshot', () => {
    const { container } = testLibJestUtils.render(<NotificationPage />);

    expect(container).toMatchSnapshot();
  });
});
