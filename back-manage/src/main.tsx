import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router";
import { RouterProvider } from "react-router";
import { App, ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";

import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={zhCN}>
    <App>
      <RouterProvider router={router} />
    </App>
  </ConfigProvider>,
);
