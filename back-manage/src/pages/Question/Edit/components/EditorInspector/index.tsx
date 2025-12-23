import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import AttributeSetting from './AttributeSetting';
import PageSetting from './PageSetting';

const EditorInspector = () => {
  return (
    <div className="w-100 bg-white px-4">
      <Tabs
        items={[
          {
            key: '1',
            label: '属性',
            icon: <FileTextOutlined />,
            children: <AttributeSetting />,
          },
          {
            key: '2',
            label: '页面设置',
            icon: <SettingOutlined />,
            children: <PageSetting />,
          },
        ]}
      />
    </div>
  );
};
export default EditorInspector;
