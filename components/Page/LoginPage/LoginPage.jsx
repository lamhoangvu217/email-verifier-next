import MainLayout from '@/components/layouts/MainLayout'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Typography } from 'antd'
import React from 'react'
const { Title } = Typography;
function LoginPage() {
  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('Login successful!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Login failed, please check your input.');
  };
  return (
    <MainLayout>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 160px)',
        backgroundColor: '#f0f2f5'
      }}>
        <Card
          style={{ width: 400, borderRadius: '10px' }}
        >
          <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>Login</Title>

          <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your username or email!' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username or Email"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: '100%' }}
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </MainLayout>
  )
}

export default LoginPage