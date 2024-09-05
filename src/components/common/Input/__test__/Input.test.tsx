// Components
import Input from '../index';

describe('Input Component', () => {
  it('should match with snapshot', () => {
    const component = testLibJestUtils.render(
      <Input
        label="Input Label"
        name="inputName"
        labelPlacement="outside"
        placeholder="Input Placeholder"
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
