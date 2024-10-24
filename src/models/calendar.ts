export interface IEvent {
  id: number;
  title: string;
  status: string;
  location: string;
  visibility: string;
  date: Date;
  startTime: string;
  endTime: string;
  eventType: string;
  repeatSetting: string;
  notificationTime: string;
  users_permissions_users: number[];
}

export interface ICalendarTask {
  id: number;
  title: string;
  date: Date;
  time: string;
  descriptions: string;
}
