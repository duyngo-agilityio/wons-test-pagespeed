'use client';

import { cn, Tabs as NextUITabs, Tab, TabsProps } from '@nextui-org/react';

interface TabType {
  key: string;
  label: string;
  content?: string;
  isDisable?: boolean;
}

interface CustomTabsProps extends TabsProps {
  tabs: TabType[];
}

const Tabs = ({ tabs, classNames, className, ...props }: CustomTabsProps) => {
  const { cursor, tabList, tab, tabContent } = classNames || {};

  return (
    <NextUITabs
      className={cn('p-4 rounded-[3px] dark:bg-purple-900', className)}
      aria-label="Custom tabs"
      classNames={{
        base: 'text-white',
        tabList: cn('bg-pink-400 dark:bg-pink-600', tabList),
        cursor: cn('bg-pink-500', cursor),
        tabContent: cn(
          'text-gray-700 dark:text-pink-700 group-data-[selected=true]:text-white',
          tabContent,
        ),
        tab: cn('my-[2px] mx-[2px]', tab),
      }}
      {...props}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.key}
          title={tab.label}
          isDisabled={tab.isDisable}
          className="px-4 py-2"
        />
      ))}
    </NextUITabs>
  );
};

export default Tabs;
