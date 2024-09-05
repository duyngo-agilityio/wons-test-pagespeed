// Components
import Heading from '../index';

describe('Heading Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match with snapshot', () => {
    const component = testLibJestUtils.render(
      <Heading>This is a heading</Heading>,
    );

    expect(component).toMatchSnapshot();
  });
});
