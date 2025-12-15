import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router";
import { RouterProvider } from "react-router";
import { App, ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider>
    <App>
      <RouterProvider router={router} />
    </App>
  </ConfigProvider>,
);
