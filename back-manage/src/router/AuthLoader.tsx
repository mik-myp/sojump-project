import {
  FileTextOutlined,
  RestOutlined,
  StarOutlined,
} from "@ant-design/icons";

export default async function AuthLoader() {
  return {
    menuList: [
      {
        key: "/manage/list",
        label: "我的问卷",
        icon: <FileTextOutlined />,
      },
      {
        key: "/manage/star",
        label: "星标问卷",
        icon: <StarOutlined />,
      },
      {
        key: "/manage/trash",
        label: "回收站",
        icon: <RestOutlined />,
      },
    ],
  };
}
