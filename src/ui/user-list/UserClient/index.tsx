import { Avatar, Select, SelectItem } from '@nextui-org/react';

// Models
import { TUser } from '@/models';

interface UserSelectProps {
  users: TUser[];
}

const UserClient: React.FC<UserSelectProps> = ({ users }) => {
  return (
    <Select
      items={users}
      label="Assigned to"
      placeholder="Select a user"
      labelPlacement="outside"
      classNames={{
        base: 'max-w-xs',
        trigger: 'h-12',
      }}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <Avatar
              alt={item.data?.username}
              className="flex-shrink-0"
              size="sm"
              src={item.data?.avatar}
            />
            <div className="flex flex-col">
              <span>{item.data?.username}</span>
              <span className="text-default-500 text-tiny">
                ({item.data?.email})
              </span>
            </div>
          </div>
        ));
      }}
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.username}>
          <div className="flex gap-2 items-center">
            <Avatar
              alt={user.username}
              className="flex-shrink-0"
              size="sm"
              src={user.avatar}
            />
            <div className="flex flex-col">
              <span className="text-small">{user.username}</span>
              <span className="text-tiny text-default-400">{user.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};

export default UserClient;
