import { userDetailsState } from '@/recoil/atom';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';

function AccountInfo() {
  const userDetail = useRecoilValue(userDetailsState);
  const [mode, setMode] = useState("view")
  const [form] = Form.useForm()
  useEffect(() => {
    if (userDetail) {
      form.setFieldsValue({
        username: userDetail?.username,
        email: userDetail?.email
      })
    }
  }, [userDetail])
  return (
    <div style={{
      width: "400px"
    }}>
      <Form
        form={form}
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
            disabled={mode === "view"}
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
            disabled={mode === "view"}
          />
        </Form.Item>


        {/* Change mode Button */}
        {mode === "edit" &&
          <Form.Item>
            <Flex gap={8}>
              <Button
                type="primary"
                size="large"
                htmlType='submit'
              >
                Save
              </Button>
              <Button
                type="default"
                size="large"
                onClick={() => setMode("view")}
              >
                Cancel
              </Button>
            </Flex>

          </Form.Item>
        }
        {mode === "view" && 
          <Button
            type="primary"
            size="large"
            onClick={() => setMode("edit")}
          >
            Update info
          </Button>
        }
      </Form>
    </div>
  )
}

export default AccountInfo