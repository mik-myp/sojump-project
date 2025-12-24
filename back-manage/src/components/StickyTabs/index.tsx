import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import StickyBox from 'react-sticky-box';
import classNames from 'classnames';
import styles from './index.module.less';

type StickyTabsProps = TabsProps & {
  /** 是否开启吸顶 */
  sticky?: boolean;
};

const StickyTabs: React.FC<StickyTabsProps> = ({ sticky = false, className, ...props }) => {
  const renderTabBar: TabsProps['renderTabBar'] = (tabBarProps, DefaultTabBar) => {
    const tabBar = <DefaultTabBar {...tabBarProps} />;
    if (!sticky) return tabBar;
    return (
      <StickyBox offsetTop={0} style={{ zIndex: 1 }}>
        {tabBar}
      </StickyBox>
    );
  };

  return (
    <Tabs
      {...props}
      renderTabBar={renderTabBar}
      tabBarStyle={{ margin: 0 }}
      rootClassName={classNames('flex flex-col h-full', styles.stickyTabs, className)}
    />
  );
};

export default StickyTabs;
