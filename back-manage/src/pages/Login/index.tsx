import { Button, Card, Form, Input, Typography, type FormProps } from "antd";
import { Link, useNavigate } from "react-router";

type LoginFormValues = {
  username: string;
  password: string;
};

const handleLogin: FormProps<LoginFormValues>["onFinish"] = () => {};

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-blue-50 px-4 py-10">
      <Card className="w-full max-w-md shadow-xl">
        <Typography.Title level={3} className="mb-2! text-center">
          登录问卷星
        </Typography.Title>
        <Typography.Paragraph className="text-center text-gray-500">
          使用账号管理你的问卷与数据
        </Typography.Paragraph>
        <Form<LoginFormValues>
          layout="vertical"
          requiredMark={false}
          className="mt-4"
          onFinish={handleLogin}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input size="large" placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password size="large" placeholder="请输入密码" />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            登录
          </Button>
        </Form>
        <div className="mt-4 text-center text-sm text-gray-600">
          没有账号？
          <Button
            type="link"
            className="align-baseline p-0"
            onClick={() => navigate("/register")}
          >
            注册
          </Button>
          或{" "}
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            返回首页
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
