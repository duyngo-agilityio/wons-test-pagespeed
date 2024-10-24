'use client';

import { memo, ReactNode } from 'react';
import isEqual from 'react-fast-compare';

import { cn, Tabs as NextUITabs, Tab, TabsProps } from '@nextui-org/react';

interface TabType {
  key: string;
  label: string;
  content?: ReactNode;
  isDisable?: boolean;
}

interface CustomTabsProps extends TabsProps {
  tabs: TabType[];
  customVariant?: 'primary' | 'secondary';
}

const Tabs = ({
  tabs,
  customVariant = 'primary',
  classNames,
  className,
  ...props
}: CustomTabsProps) => {
  const primaryStyles = {
    base: 'text-white',
    tabList: 'bg-pink-400 dark:bg-pink-600',
    cursor: 'bg-pink-500',
    tab: 'my-[2px] mx-[2px]',
    tabContent:
      'text-gray-700 dark:text-pink-700 group-data-[selected=true]:text-white',
  };

  const secondaryStyles = {
    base: 'text-black dark:text-white',
    tabList: 'bg-white dark:bg-gray-400 p-0 rounded-[5px]',
    cursor: 'bg-blue-500 dark:bg-purple-600 rounded-none',
    tab: 'px-4 !py-6 font-medium text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-white',
    tabContent:
      'text-blue-800 dark:text-white group-data-[selected=true]:text-white dark:group-data-[selected=true]:text-gray-400',
  };

  const styles =
    customVariant === 'secondary' ? secondaryStyles : primaryStyles;

  return (
    <NextUITabs
      className={cn('p-4 rounded-[3px]', className)}
      aria-label="Custom tabs"
      classNames={{
        base: cn(styles.base, classNames?.base),
        tabList: cn(styles.tabList, classNames?.tabList),
        cursor: cn(styles.cursor, classNames?.cursor),
        tab: cn(styles.tab, classNames?.tab),
        tabContent: cn(styles.tabContent, classNames?.tabContent),
      }}
      {...props}
    >
      {tabs.map((tab) => {
        const { key, label, isDisable, content } = tab;

        return (
          <Tab
            key={key}
            title={label}
            isDisabled={isDisable}
            // className="px-4 py-2"
          >
            {content}
          </Tab>
        );
      })}
    </NextUITabs>
  );
};

export default memo(Tabs, isEqual);
