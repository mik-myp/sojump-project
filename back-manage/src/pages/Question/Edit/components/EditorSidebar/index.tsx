import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import ComponentLibrary from './ComponentLibrary';
import Layer from './Layer';

const EditorSidebar = () => {
  return (
    <div className="w-100 bg-white px-4">
      <Tabs
        items={[
          {
            key: '1',
            label: '组件库',
            icon: <AppstoreOutlined />,
            children: <ComponentLibrary />,
          },
          {
            key: '2',
            label: '图层',
            icon: <UnorderedListOutlined />,
            children: <Layer />,
          },
        ]}
      />
    </div>
  );
};
export default EditorSidebar;
