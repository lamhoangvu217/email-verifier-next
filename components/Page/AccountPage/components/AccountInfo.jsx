import { userDetailsState } from '@/recoil/atom';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';

function AccountInfo() {
  const [isLoading, setIsLoading] = useState(false)
  const [userDetail, setUserDetail] = useRecoilState(userDetailsState);
  const [mode, setMode] = useState("view")
  const [form] = Form.useForm();

  useEffect(() => {
    if (userDetail) {
      form.setFieldsValue({
        username: userDetail?.username,
        email: userDetail?.email,
        avatar: userDetail?.avatar
      })
    }
  }, [userDetail])

  const handleSaveAccountInfo = async () => {
    setIsLoading(true)
    const payload = await form.validateFields();
    const update = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/api/user`, payload, {
      withCredentials: true
    }).then((res) => {
      setUserDetail(res.data.user)
      message.success(res?.data?.message)
      setMode("view")
    }).catch((err) => {
      message.error("Update user error. Please try again")
    })
    setIsLoading(false)
  }
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

        {/* Avatar Field */}
        <Form.Item
          name="avatar"
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Your avatar link"
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
            disabled
          />
        </Form.Item>


        {/* Change mode Button */}
        {mode === "edit" &&
          <Form.Item>
            <Flex gap={8}>
              <Button
                type="primary"
                size="large"
                onClick={handleSaveAccountInfo}
                loading={isLoading}
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