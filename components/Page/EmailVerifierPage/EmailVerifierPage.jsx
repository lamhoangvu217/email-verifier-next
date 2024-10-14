import React, { useEffect, useState } from "react";
import { Button, Flex, Form, Input, List, Typography, Upload, Spin, Grid } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import * as XLSX from "xlsx"; // Import the xlsx library
import MainLayout from "@/components/layouts/MainLayout";

const { TextArea } = Input;

function EmailVerifierPage() {
  const [invalidEmails, setInvalidEmails] = useState([]);
  const [validEmails, setValidEmails] = useState([]);
  const [form] = Form.useForm();
  const [emailsRemoved, setEmailsRemoved] = useState(false);
  const [columnInput, setColumnInput] = useState(""); // State for column input
  const [loading, setLoading] = useState(false); // State to manage loading
  const { xs } = Grid.useBreakpoint();
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

  const handleUpload = (file) => {
    if (!columnInput) {
      toast.error("Please specify a column letter before uploading.");
      return false; // Prevent default upload behavior
    }

    setLoading(true); // Set loading to true when file upload starts
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming you're interested in the first sheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert to JSON to get column data
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Convert column letter to column index (A -> 0, B -> 1, etc.)
      const columnIndex = columnInput.toUpperCase().charCodeAt(0) - 65; // 'A' is 65 in ASCII

      // Extract data from the specified column
      const emailsFromColumn = jsonData.map((row) => row[columnIndex]).filter(Boolean); // Use the columnIndex
      form.setFieldsValue({ emailList: emailsFromColumn.join("\n") }); // Set email list in the form

      setLoading(false); // Set loading to false after processing the file
    };

    reader.readAsArrayBuffer(file);
    return false; // Prevent default upload behavior
  };

  const onFinish = (values) => {
    const convertedEmails = values.emailList.split(/\r?\n/).map((s) => s.trim());
    const invalidEmails = convertedEmails.filter(email => !validateEmail(email, true));
    const validEmails = convertedEmails.filter(email => !invalidEmails.includes(email));
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
    toast.success("Invalid email was deleted");
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
  useEffect(() => {
    if (window?.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);
  return (
    <MainLayout>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "white",
          borderRadius: "16px",
          padding: xs ? "0 24px" : 0
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
          <h1 style={{ fontSize: "32px" }}>Email Verifier</h1>
          <Flex align="center" vertical={xs} gap={16} style={{
            margin: "16px 0"
          }} >
            <div>
              <label htmlFor="column-input" style={{ fontWeight: "bold" }}>Column:</label>
            </div>
            <Input
              id="column-input"
              value={columnInput}
              onChange={(e) => setColumnInput(e.target.value)}
              placeholder="Enter column letter (A, B, ...)"
              style={{ width: "200px" }}
            />

            <Upload beforeUpload={handleUpload} showUploadList={false}>
              <Button
                icon={<UploadOutlined />}
                disabled={!columnInput} // Disable button if no column letter is entered
              >
                Upload Excel File
              </Button>
            </Upload>
          </Flex>
          {/* Column Input Label */}

          {loading && <Spin tip="Uploading..." style={{ margin: "16px 0" }} />} {/* Show loading spinner */}
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
              label="Emails"
              name="emailList"
              rules={[
                {
                  required: true,
                  message: "Please input your email list",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Type email or email list" />
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button type="primary" htmlType="submit" style={{ width: "120px", backgroundColor: "#6c5ce7" }}>
                Check
              </Button>
            </Form.Item>
          </Form>
          <List
            header={
              <Flex vertical>
                <span style={{ fontWeight: 600, fontSize: "20px" }}>
                  Invalid emails
                </span>
                {invalidEmails?.length > 0 && <span>Found {invalidEmails.length} emails</span>}
              </Flex>
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
                  Remove invalid emails
                </Button>
                {emailsRemoved && validEmails.length > 0 && (
                  <Button onClick={createAndDownloadFile} type="primary">
                    Download
                  </Button>
                )}
              </div>
            }
            bordered
            dataSource={invalidEmails}
            locale={{
              emptyText: "No data available",
            }}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text>{item}</Typography.Text>
              </List.Item>
            )}
            style={{ maxHeight: "300px", overflowY: "auto" }}
          />
        </div>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_URL_GG_ADS_CODE}`}
          data-ad-slot={`${process.env.NEXT_PUBLIC_URL_GG_ADS_AD_SLOT}`}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </MainLayout>
  );
}

export default EmailVerifierPage;
