import MainLayout from '@/components/layouts/MainLayout'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Typography } from 'antd'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
const { Title } = Typography;
function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const onLogin = async (values) => {
    setIsLoading(true)
    const login = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/api/login`,
      {
        email: values.email,
        password: values.password
      }
    ).then((res) => {
      if (res.status === 200) {
        message.success('Login successfully!');
        router.push("/email-verifier");
        Cookies.set("jwt", res.data.access_token)
      }
    }).catch((err) => {
      message.error(err?.response?.data?.message ? `Login error! ${err?.response?.data?.message}` : "Login error! Please try again later")
    })
    setIsLoading(false)
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
            onFinish={onLogin}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
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
                loading={isLoading}
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