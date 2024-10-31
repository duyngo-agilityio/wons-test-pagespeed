export const EVENT_MOCKS = {
  title: 'Test Event',
  status: 'active',
  location: 'New York',
  date: new Date('2024-10-14'),
  startTime: '10:00',
  endTime: '12:00',
  users_permissions_users: [1, 2],
};

export const EVENTS_MOCKS = [
  {
    id: 1,
    attributes: {
      title: 'Test Event',
      status: 'active',
      location: 'New York',
      date: new Date('2024-10-14'),
      startTime: '10:00',
      endTime: '12:00',
      users_permissions_users: [1, 2],
    },
  },

  {
    id: 2,
    attributes: {
      title: 'Implement Component',
      descriptions: 'Implement for all component',
      date: '2024-10-20T01:30:00Z',
      time: '2024-10-20T01:30:00Z',
      createdAt: '2024-10-22T09:46:11.546Z',
      updatedAt: '2024-10-22T09:46:16.769Z',
      publishedAt: '2024-10-22T09:46:16.768Z',
    },
  },
];

export const EVENTS_MOCKS_WIDTH_USERS_PERMISSIONS = {
  title: 'Test Event',
  status: 'active',
  location: 'New York',
  date: new Date('2024-10-14'),
  startTime: '10:00',
  endTime: '12:00',
  users_permissions_users: {
    data: [
      {
        id: 3,
        attributes: {
          username: 'superadmin',
          email: 'admin1@gmail.com',
          provider: 'local',
          confirmed: false,
          blocked: false,
          fullName: 'Super Admin',
          createdAt: '2024-08-28T04:29:52.000Z',
          updatedAt: '2024-10-11T02:14:38.208Z',
          avatar:
            'https://watermark.lovepik.com/photo/20211209/large/lovepik-japanese-fresh-girl-park-photo-picture_501698500.jpg',
        },
      },
    ],
  },
};
