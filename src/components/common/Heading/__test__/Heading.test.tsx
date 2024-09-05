// Components
import Heading from '../index';

describe('Heading Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match with snapshot', () => {
    const component = testLibJestUtils.render(
      <Heading title="This is a heading" />,
    );

    expect(component).toMatchSnapshot();
  });
});
