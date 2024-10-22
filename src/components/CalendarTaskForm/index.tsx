'use client';

import { memo } from 'react';

import isEqual from 'react-fast-compare';

const CalendarTaskForm = () => {
  return <form></form>;
};

export default memo(CalendarTaskForm, isEqual);
