// UI
import InvoiceListClient, { TInvoiceListClientProps } from '../index';

// Mocks
import { MOCK_INVOICES_WITH_CUSTOMER } from '@/mocks';

// Constants
import {
  ERROR_MESSAGES,
  MESSAGE_STATUS,
  ORDER,
  SUCCESS_MESSAGES,
} from '@/constants';

// Actions
import { deleteInvoice, updateInvoice } from '@/actions';

jest.mock('@/actions', () => ({
  ...jest.requireActual('@/actions'),
  updateInvoice: jest.fn(),
  deleteInvoice: jest.fn(),
  deleteMultipleInvoice: jest.fn(),
}));

const mockShowToast = jest.fn();
jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useToast: () => ({ showToast: mockShowToast }),
}));

const mockReplace = jest.fn();
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(() => ({ replace: mockReplace, push: mockPush })),
}));

describe('InvoiceListClient section', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props?: Partial<TInvoiceListClientProps>) =>
    testLibJestUtils.render(
      <InvoiceListClient
        invoiceList={MOCK_INVOICES_WITH_CUSTOMER}
        pageCount={1}
        {...props}
      />,
    );

  it('should match with snapshot', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('should show a success message when select invoice successfully.', async () => {
    (updateInvoice as jest.MockedFn<typeof updateInvoice>).mockResolvedValue();
    const { getAllByTestId } = renderComponent();

    testLibJestUtils.fireEvent.click(getAllByTestId('star-btn')[0]);

    testLibJestUtils.waitFor(() =>
      expect(mockShowToast).toHaveBeenCalledWith({
        description: SUCCESS_MESSAGES.DELETE_INVOICE,
        status: MESSAGE_STATUS.SUCCESS,
      }),
    );
  });

  it('should show a error message when select invoice failed.', async () => {
    (updateInvoice as jest.MockedFn<typeof updateInvoice>).mockResolvedValue({
      error: ERROR_MESSAGES.UPDATE_INVOICE,
    });
    const { getAllByTestId } = renderComponent();

    testLibJestUtils.fireEvent.click(getAllByTestId('star-btn')[0]);

    testLibJestUtils.waitFor(() =>
      expect(mockShowToast).toHaveBeenCalledWith({
        description: SUCCESS_MESSAGES.DELETE_INVOICE,
        status: MESSAGE_STATUS.ERROR,
      }),
    );
  });

  it('should call replace when handling sort descending', async () => {
    const { getAllByTestId } = renderComponent();

    testLibJestUtils.fireEvent.click(getAllByTestId('sort-btn')[0]);

    expect(mockReplace).toHaveBeenCalled();
  });

  it('should call replace when handling sort descending', async () => {
    const { getAllByTestId } = renderComponent({ sortOrder: ORDER.DESC });

    testLibJestUtils.fireEvent.click(getAllByTestId('sort-btn')[0]);

    expect(mockReplace).toHaveBeenCalled();
  });

  it('should navigate to Edit Invoice page when click Edit button', async () => {
    const { getAllByTestId, getByText } = renderComponent({
      sortOrder: ORDER.DESC,
    });

    testLibJestUtils.fireEvent.click(getAllByTestId('actions-btn')[0]);
    testLibJestUtils.fireEvent.click(getByText('Edit'));

    expect(mockPush).toHaveBeenCalled();
  });

  it('should show a success message when delete invoice successfully.', async () => {
    (deleteInvoice as jest.MockedFn<typeof deleteInvoice>).mockResolvedValue();
    const { getAllByTestId, getByText, getByRole } = renderComponent();

    // Open the delete confirm modal
    testLibJestUtils.fireEvent.click(getAllByTestId('actions-btn')[0]);
    testLibJestUtils.fireEvent.click(getByText('Delete'));

    await testLibJestUtils.waitFor(() =>
      expect(getByText('Delete Item')).toBeInTheDocument(),
    );

    // Click confirm delete invoice
    testLibJestUtils.fireEvent.click(getByRole('button', { name: /Delete/ }));

    testLibJestUtils.waitFor(() =>
      expect(mockShowToast).toHaveBeenCalledWith({
        description: SUCCESS_MESSAGES.DELETE_INVOICE,
        status: MESSAGE_STATUS.SUCCESS,
      }),
    );
  });

  it('should show a error message when delete invoice failed.', async () => {
    (deleteInvoice as jest.MockedFn<typeof deleteInvoice>).mockResolvedValue({
      error: ERROR_MESSAGES.DELETE_INVOICE,
    });
    const { getAllByTestId, getByText, getByRole } = renderComponent();

    // Open the delete confirm modal
    testLibJestUtils.fireEvent.click(getAllByTestId('actions-btn')[0]);
    testLibJestUtils.fireEvent.click(getByText('Delete'));

    await testLibJestUtils.waitFor(() =>
      expect(getByText('Delete Item')).toBeInTheDocument(),
    );

    // Click confirm delete invoice
    testLibJestUtils.fireEvent.click(getByRole('button', { name: /Delete/ }));

    testLibJestUtils.waitFor(() =>
      expect(mockShowToast).toHaveBeenCalledWith({
        description: ERROR_MESSAGES.DELETE_INVOICE,
        status: MESSAGE_STATUS.ERROR,
      }),
    );
  });
});
