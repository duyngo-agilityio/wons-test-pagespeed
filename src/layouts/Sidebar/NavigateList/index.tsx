'use client';

import { memo, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Chip, Listbox, ListboxItem } from '@nextui-org/react';
import clsx from 'clsx';

// Themes
import { colors } from '@/themes';

// Constants
import { ROUTES, SIDE_BAR_STATE, THEME_MODES } from '@/constants';

// Components
import {
  AnalyticsIcon,
  CalendarIcon,
  DashboardIcon,
  InvoiceIcon,
  MessageIcon,
  NotificationIcon,
  ScheduleIcon,
  SettingIcon,
} from '@/components/common';

interface INavigateList {
  toggle?: string;
}

const NavigateList = ({ toggle = SIDE_BAR_STATE.OPEN }: INavigateList) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const {
    ANALYTICS,
    CALENDAR,
    DASHBOARD,
    INVOICE,
    MESSAGES,
    NOTIFICATION,
    SCHEDULE,
    SETTINGS,
  } = ROUTES;
  const { LIGHT, DARK } = THEME_MODES;
  const iconColor = {
    [DARK]: colors.white,
    [LIGHT]: colors.blue[800],
  };

  const mappingIconColor = (url: string): Record<string, string | number> => {
    if (pathname === url) return { color: colors.purple[600], opacity: 1 };

    return { color: iconColor[theme as string], opacity: 0.4 };
  };

  const MAPPING_SIDEBAR_CONTENTS = useMemo(
    () => [
      {
        id: 'sb_1',
        href: DASHBOARD,
        content: 'Dashboard',
        startContent: <DashboardIcon {...mappingIconColor(DASHBOARD)} />,
      },
      {
        id: 'sb_2',
        href: ANALYTICS,
        content: 'Analytics',
        startContent: <AnalyticsIcon {...mappingIconColor(ANALYTICS)} />,
      },
      {
        id: 'sb_3',
        href: INVOICE,
        content: 'Invoice',
        startContent: <InvoiceIcon {...mappingIconColor(INVOICE)} />,
      },
      {
        id: 'sb_4',
        href: SCHEDULE,
        content: 'Schedule',
        startContent: <ScheduleIcon {...mappingIconColor(SCHEDULE)} />,
      },
      {
        id: 'sb_5',
        href: CALENDAR,
        content: 'Calendar',
        startContent: <CalendarIcon {...mappingIconColor(CALENDAR)} />,
      },
      {
        id: 'sb_6',
        href: MESSAGES,
        content: 'Messages',
        startContent: <MessageIcon {...mappingIconColor(MESSAGES)} />,
        endContent: (
          <Chip
            classNames={{
              base: 'bg-pink-500/10',
              content: 'text-pink-500 text-xs',
            }}
          >
            49
          </Chip>
        ),
      },
      {
        id: 'sb_7',
        href: NOTIFICATION,
        content: 'Notification',
        startContent: <NotificationIcon {...mappingIconColor(NOTIFICATION)} />,
      },
      {
        id: 'sb_8',
        href: SETTINGS,
        content: 'Settings',
        startContent: <SettingIcon {...mappingIconColor(SETTINGS)} />,
      },
    ],
    [mappingIconColor],
  );

  return (
    <Listbox>
      {MAPPING_SIDEBAR_CONTENTS.map(
        ({ id, href, startContent, endContent, content }) => (
          <ListboxItem
            key={id}
            startContent={toggle === SIDE_BAR_STATE.OPEN && startContent}
            endContent={toggle === SIDE_BAR_STATE.OPEN && endContent}
            className={clsx(
              'dark:hover:bg-blue-800 mb-5 gap-4 items-center',
              toggle === SIDE_BAR_STATE.CLOSED && 'max-w-fit',
              pathname === href
                ? `text-blue-500 dark:text-purple-600 pointer-events-none before:block before:absolute before:h-12 before:-top-2 before:rounded-r-5 before:bg-gray-200/20 ${toggle === SIDE_BAR_STATE.OPEN ? 'before:w-[60px] before:-left-7' : 'before:w-[53px] before:-left-[22px]'}`
                : 'text-blue-800 dark:text-white opacity-50',
            )}
            classNames={{
              title: ['text-xl font-medium'],
            }}
          >
            <Link href={href}>
              {toggle === SIDE_BAR_STATE.OPEN ? content : startContent}
            </Link>
          </ListboxItem>
        ),
      )}
    </Listbox>
  );
};

export default memo(NavigateList);
