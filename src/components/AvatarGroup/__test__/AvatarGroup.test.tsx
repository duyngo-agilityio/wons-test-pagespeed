// components
import AvatarGroup from '../index';

// mocks
import { MOCK_USERS } from '@/mocks';

describe('AvatarGroup Component', () => {
  it('should match snapshot', () => {
    const { container } = testLibJestUtils.render(
      <AvatarGroup users={MOCK_USERS} />,
    );
    expect(container).toMatchSnapshot();
  });
});
