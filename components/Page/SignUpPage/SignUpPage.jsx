import MainLayout from "@/components/layouts/MainLayout"
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
const { Title } = Typography;
function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const onRegister = async (values) => {
    setIsLoading(true)
    const register = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/api/register`,
      {
        email: values.email,
        password: values.password,
        username: values.username,
        user_type: ""
      }
    ).then((res) => {
      if (res.status === 200) {
        message.success('Sign Up successfully!');
        router.push("/login")
      }
    }).catch((err) => {
      message.error(err?.response?.data?.message ? `Sign up error! ${err?.response?.data?.message}` : "Sign up error! Please try again later")
    })
    setIsLoading(false)
  };
  return (
    <MainLayout>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 160px)',
          backgroundColor: '#f0f2f5',
        }}
      >
        <Card
          style={{ width: 400, borderRadius: '10px' }}
        >
          <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Create a new account
          </Title>

          <Form
            name="signup_form"
            onFinish={onRegister}
          >
            {/* Username Field */}
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>

            {/* Email Field */}
            <Form.Item
              name="email"
              rules={[
                { type: 'email', message: 'The input is not valid E-mail!' },
                { required: true, message: 'Please input your E-mail!' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            {/* Confirm Password Field */}
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The two passwords do not match!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
                size="large"
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: '100%' }}
                loading={isLoading}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </MainLayout>
  )
}

export default SignUpPage