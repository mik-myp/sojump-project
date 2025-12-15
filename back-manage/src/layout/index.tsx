import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet, useRouteLoaderData } from "react-router";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={key.toString()}>{label}</Link>,
  } as MenuItem;
}

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { menuList } = useRouteLoaderData("layout"); // 从src\router\index.tsx中设置的路由id获取其loader返回值

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems: MenuItem[] = menuList!.map(
    (menu: { key: string; label: string; icon: React.ReactNode }) =>
      getItem(menu.label, menu.key, menu.icon),
  );

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={siderStyle}
      >
        <div className="h-8 m-4 rounded-md bg-white opacity-20" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout className="flex flex-col h-screen">
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex items-center"
        ></Header>
        <Content className="m-4 app-content flex-1 overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
