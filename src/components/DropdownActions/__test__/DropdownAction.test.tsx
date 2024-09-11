import Dropdown from '../index';

describe('Dropdown Component', () => {
  it('should match the snapshot', () => {
    const { container } = testLibJestUtils.render(
      <Dropdown id="test-id" onEdit={jest.fn()} onDelete={jest.fn()} />,
    );

    expect(container).toMatchSnapshot();
  });
});
