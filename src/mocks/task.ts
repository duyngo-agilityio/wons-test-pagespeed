import { Level, ROLES } from '@/constants';
import { TasksState } from '@/types';

export const MOCK_TASKS: TasksState = {
  todo: [
    {
      id: 1,
      attributes: {
        title: 'Dashboard Design',
        label: 'todo',
        level: Level.LOW,
        description: 'Discussion for management dashboard ui design',
        createdAt: '2024-09-23T03:07:18.697Z',
        updatedAt: '2024-10-04T02:02:44.110Z',
        publishedAt: '2024-09-23T03:07:19.719Z',
        images: [
          'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-yellow_FMT_WHH?wid=1280&hei=492&fmt=p-jpg&qlt=80&.v=bjlYUjk1NXN2Uy9CTWFMaXBneUF0bEthL1VsNXgveGUwQ1JqNzA0ZHArbjRRVTNjZitXallzNXA5ZUIwM25xZHVqay8zY0s4VHBsVmhRS2dCdnNPUHBwYUdQQkdYL0crTjZtOXJzeHgrYU02WjdNRmRCc09Pek5waThFRitZTkR0NEZTY1VIaEpLYkJrOVY3am50SHB3PT0=&traceId=1',
          'https://product.hstatic.net/1000300544/product/iphone-12-purple-select-2021_c2f1208cec9f4dcdab82932a1cc87c85.png',
        ],
        assignees: {
          data: [
            {
              id: 4,
              attributes: {
                username: 'ngocngo',
                email: 'user1@gmail.com',
                fullName: 'Ngoc Ngo',
                role: ROLES[1],
                token: '',
                avatar:
                  'https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg',
                password: '',
              },
            },
            {
              id: 5,
              attributes: {
                username: 'user',
                email: 'user@gmail.com',
                fullName: 'User User',
                avatar:
                  'https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg',
                password: '',
                role: ROLES[1],
                token: '',
              },
            },
            {
              id: 9,
              attributes: {
                username: 'user34',
                email: 'user34@gmail.com',
                fullName: 'user',
                role: ROLES[1],
                token: '',
                avatar:
                  'https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg',
                password: '',
              },
            },
          ],
        },
      },
    },
  ],
  inProgress: [
    {
      id: 2,
      attributes: {
        title: 'API Development',
        description: 'Create APIs',
        label: 'inProgress',
        level: Level.LOW,
        createdAt: '2024-09-23T03:07:18.697Z',
        updatedAt: '2024-10-04T02:02:44.110Z',
        publishedAt: '2024-09-23T03:07:19.719Z',
        assignees: {
          data: [
            {
              id: 4,
              attributes: {
                username: 'ngocngo',
                email: 'user1@gmail.com',
                fullName: 'Ngoc Ngo',
                role: ROLES[1],
                token: '',
                avatar:
                  'https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg',
                password: '',
              },
            },
            {
              id: 5,
              attributes: {
                username: 'user',
                email: 'user@gmail.com',
                fullName: 'User User',
                avatar:
                  'https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg',
                password: '',
                role: ROLES[1],
                token: '',
              },
            },
            {
              id: 9,
              attributes: {
                username: 'user34',
                email: 'user34@gmail.com',
                fullName: 'user',
                role: ROLES[1],
                token: '',
                avatar:
                  'https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg',
                password: '',
              },
            },
          ],
        },
      },
    },
  ],
  inReview: [],
  done: [],
};
