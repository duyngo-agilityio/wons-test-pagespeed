import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerDrawer from '..';

describe('CustomerDrawer', () => {
  it('matches snapshot', () => {
    const { container } = render(<CustomerDrawer />);
    expect(container).toMatchSnapshot();
  });

  it('opens the drawer when the button is clicked', () => {
    const { getAllByRole, getByRole } = render(<CustomerDrawer />);
    const buttons = getAllByRole('button', { name: 'Add Customer' });
    const button = buttons[0];
    fireEvent.click(button);
    expect(getByRole('heading', { name: 'Add Customer' })).toBeInTheDocument();
  });

  it.skip('closes the drawer when the close button is clicked', () => {
    const { getAllByRole, getByTestId, getByRole } = render(<CustomerDrawer />);
    const buttons = getAllByRole('button', { name: 'Add Customer' });
    const addButton = buttons[0];
    fireEvent.click(addButton);

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);

    const navigation = getByRole('navigation');
    expect(navigation).toHaveStyle({ transform: 'translate3d(100%, 0, 0)' });
  });
});
