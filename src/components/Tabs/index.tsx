'use client';

import { Tabs as NextUITabs, Tab, TabsProps } from '@nextui-org/react';
interface TabType {
  key: string;
  label: string;
  content: string;
}

interface CustomTabsProps extends TabsProps {
  tabs: TabType[];
}

const Tabs = ({ tabs, ...props }: CustomTabsProps) => {
  return (
    <div className={`p-4 rounded-xl  dark:bg-purple-900`}>
      <NextUITabs
        aria-label="Custom tabs"
        classNames={{
          base: 'text-white',
          tabList: `bg-pink-400 dark:bg-pink-600`,
          cursor: `bg-pink-500`,
          tabContent: `text-gray-700 dark:text-pink-700 group-data-[selected=true]:text-white`,
          tab: 'my-[2px] mx-[2px]',
        }}
        {...props}
      >
        {tabs.map((tab) => (
          <Tab key={tab.key} title={tab.label} className="px-4 py-2" />
        ))}
      </NextUITabs>
    </div>
  );
};

export default Tabs;
