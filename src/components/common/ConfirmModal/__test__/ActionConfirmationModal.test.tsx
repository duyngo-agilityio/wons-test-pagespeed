import ConfirmModal from '../index';

describe('ModalConfirm Component', () => {
  it('should match snapshot when open', () => {
    const mockOnConfirm = jest.fn();
    const mockOnCancel = jest.fn();

    const { container } = testLibJestUtils.render(
      <ConfirmModal
        title="Confirm Action"
        content="Are you sure you want to proceed?"
        isOpen={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
