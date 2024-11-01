// Components
import { Toast } from '@/components/common';

describe('Calendar', () => {
  const onCloseMock = jest.fn();

  afterEach(() => {
    onCloseMock.mockClear();
  });

  it('render toast correctly', () => {
    const { container } = testLibJestUtils.render(
      <Toast
        id="1"
        title="Success"
        description="Your action is successful"
        status="success"
        onClose={onCloseMock}
      />,
    );

    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('render toast with errors', () => {
    const { container } = testLibJestUtils.render(
      <Toast
        id="1"
        title="Error"
        description="Something went wrong"
        status="error"
        onClose={onCloseMock}
      />,
    );

    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
