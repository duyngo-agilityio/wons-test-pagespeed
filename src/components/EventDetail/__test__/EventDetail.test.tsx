import EventDetail from '../index';

describe('EventDetail Component', () => {
  it('should match snapshot', () => {
    const { container } = testLibJestUtils.render(
      <EventDetail
        isOpen={false}
        onCloseModal={jest.fn()}
        title="Upcoming Event"
        time="10:00 AM"
        location="123 Main St"
        id={1}
        link="https://meet.google.com/"
        guests={[
          { name: 'John Doe', avatar: '/avatars/john.png' },
          { name: 'Jane Doe', avatar: '/avatars/jane.png' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
