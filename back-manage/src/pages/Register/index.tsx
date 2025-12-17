import { register } from '@/service';
import { Button, Card, Form, Input, Typography, type FormProps } from 'antd';
import { Link, useNavigate } from 'react-router';

type RegisterFormValues = {
  username: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();

  const handleRegister: FormProps<RegisterFormValues>['onFinish'] = async values => {
    try {
      await register({
        username: values.username,
        password: values.password,
      });
      navigate('/login');
    } catch (_error) {}
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-50 via-white to-blue-50 px-4 py-10">
      <Card className="w-full max-w-md shadow-xl">
        <Typography.Title level={3} className="mb-2! text-center">
          注册问卷星
        </Typography.Title>
        <Typography.Paragraph className="text-center text-gray-500">
          创建账号，立即开始设计与发布问卷
        </Typography.Paragraph>
        <Form<RegisterFormValues>
          layout="vertical"
          requiredMark={false}
          className="mt-4"
          onFinish={handleRegister}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input size="large" placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请再次输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="请再次输入密码" />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            注册
          </Button>
        </Form>
        <div className="mt-4 text-center text-sm text-gray-600">
          已有账号？
          <Button type="link" className="align-baseline p-0" onClick={() => navigate('/login')}>
            去登录
          </Button>
          或{' '}
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            返回首页
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
