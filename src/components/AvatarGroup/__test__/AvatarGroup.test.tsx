// components
import AvatarGroup from '../index';

// mocks
import { MOCK_AVATAR_GROUP } from '@/mocks';

describe('AvatarGroup Component', () => {
  it('should match snapshot', () => {
    const { container } = testLibJestUtils.render(
      <AvatarGroup users={MOCK_AVATAR_GROUP} />,
    );
    expect(container).toMatchSnapshot();
  });
});
