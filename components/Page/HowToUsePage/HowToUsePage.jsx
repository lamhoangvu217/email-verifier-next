import React from "react";
import { Typography, Space } from "antd";
import MainLayout from "@/components/layouts/MainLayout";

const HowToUsePage = () => {
  return (
    <MainLayout>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography.Title level={2}>How to Use the Email Verifier</Typography.Title>

        <Typography.Paragraph>
          Follow these simple steps to verify your email addresses efficiently:
        </Typography.Paragraph>

        <Typography.Title level={3}>Step-by-Step Instructions</Typography.Title>
        <Space direction="vertical">
          <Typography.Paragraph>
            <strong>1. Specify the Column:</strong> Enter the letter of the column in your Excel file that contains the email addresses (e.g., A, B).
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>2. Upload Your Excel File:</strong> Click on the {"Upload Excel File"} button to select and upload your Excel file. Ensure that the file contains a header row.
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>3. Validate Emails:</strong> After uploading, click the {"Check"} button to begin the email validation process. The application will analyze the email addresses and display the results.
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>4. Review Invalid Emails:</strong> If there are any invalid email addresses, they will be listed under the {"Invalid emails"} section. You can see how many invalid emails were found.
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>5. Remove Invalid Emails:</strong> If you want to clean your list, click the {"Remove invalid emails"} button. This will delete all invalid emails from your list.
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>6. Download Valid Emails:</strong> After removing invalid emails, you can download the cleaned list of valid email addresses by clicking the {"Download"} button.
          </Typography.Paragraph>
        </Space>

        <Typography.Title level={3}>Tips for Best Results</Typography.Title>
        <Space direction="vertical">
          <Typography.Paragraph>
            - Make sure your Excel file is formatted correctly, with email addresses in the specified column.
          </Typography.Paragraph>
          <Typography.Paragraph>
            - Double-check that you are entering the correct column letter before uploading your file.
          </Typography.Paragraph>
          <Typography.Paragraph>
            - Use valid email formats to avoid unnecessary invalid email entries.
          </Typography.Paragraph>
        </Space>

        <Typography.Title level={3}>Need Help?</Typography.Title>
        <Typography.Paragraph>
          If you encounter any issues or have questions, feel free to reach out to our support team at <a href="mailto:support@example.com">support@example.com</a>.
        </Typography.Paragraph>
      </div>
    </MainLayout>
  );
};

export default HowToUsePage;
