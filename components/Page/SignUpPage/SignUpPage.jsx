import MainLayout from "@/components/layouts/MainLayout"
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography } from "antd";
const { Title } = Typography;
function SignUpPage() {
  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('Sign Up successful!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Sign Up failed, please check your input.');
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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