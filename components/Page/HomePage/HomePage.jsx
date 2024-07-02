import React, { useState } from "react";
import { Button, Form, Input, List, Typography } from "antd";
import toast from "react-hot-toast";
const { TextArea } = Input;

function HomePage() {
  const [invalidEmails, setInvalidEmails] = useState([]);
  const [validEmails, setValidEmails] = useState([]);
  const [form] = Form.useForm();
  const [emailsRemoved, setEmailsRemoved] = useState(false);
  const validateEmail = (email, isMultiEmail = false) => {
    let re =
      /^(([^<>()\\,;:\s@"]+(\.[^<>().,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (isMultiEmail) {
      let convertEmailList = email.split("\n");
      return !convertEmailList.some(
        (item) => re.test(String(item).toLowerCase()) === false
      );
    } else {
      return re.test(String(email).toLowerCase());
    }
  };

  function validateEmailList(emailList, isMultiEmail) {
    let invalidEmail = [];
    emailList.forEach((email) => {
      if (!validateEmail(email, isMultiEmail)) {
        invalidEmail.push(email);
      }
    });
    return invalidEmail;
  }

  function convertEmailsString(emailsString) {
    const emails = emailsString.split(/\r?\n/);
    return emails;
  }

  const onFinish = (values) => {
    const convertedEmails = convertEmailsString(values.emailList);
    const invalidEmails = validateEmailList(convertedEmails, true);
    const validEmails = convertedEmails.filter(
      (email) => !invalidEmails.includes(email)
    );
    setInvalidEmails(invalidEmails);
    setValidEmails(validEmails);
    setEmailsRemoved(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const removeEmailInvalid = () => {
    form.setFieldsValue({
      emailList: validEmails.join("\n"),
    });
    setInvalidEmails([]);
    setEmailsRemoved(true);
    toast.success("Email không hợp lệ đã bị xóa");
  };

  const createAndDownloadFile = () => {
    const text = validEmails.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "valid-emails.txt";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          paddingTop: "24px",
          paddingBottom: "32px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            color: "gray",
            fontSize: "32px",
          }}
        >
          Email Verifier
        </span>
        <span
          style={{
            color: "black",
            fontSize: "12px",
            marginBottom: "16px",
          }}
        >
          @LamVuHoang
        </span>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Form.Item
            label="Danh sách Email"
            name="emailList"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập danh sách email",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Nhập email hoặc danh sách email" />
          </Form.Item>
          <Form.Item
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button type="primary" htmlType="submit" style={{ width: "120px" }}>
              Kiểm tra
            </Button>
          </Form.Item>
        </Form>
        <List
          header={
            <span style={{ fontWeight: 600, fontSize: "20px" }}>
              Danh sách Email không hợp lệ
            </span>
          }
          footer={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Button
                disabled={!(invalidEmails.length > 0)}
                onClick={removeEmailInvalid}
                danger
              >
                Loại bỏ Email không hợp lệ
              </Button>
              {emailsRemoved && validEmails.length > 0 && (
                <Button onClick={createAndDownloadFile} type="primary">
                  Tải xuống danh sách Email đúng
                </Button>
              )}
            </div>
          }
          bordered
          dataSource={invalidEmails}
          locale={{
            emptyText: "Không có dữ liệu",
          }}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>{item}</Typography.Text>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default HomePage;
