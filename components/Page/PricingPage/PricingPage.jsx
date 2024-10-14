import MainLayout from '@/components/layouts/MainLayout'
import { pricingPlans } from '@/constants/pricing'
import { CheckOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row } from 'antd'
import React from 'react'

function PricingPage() {
  return (
    <MainLayout>
      <div style={{ padding: '50px', backgroundColor: '#f0f2f5', borderRadius: "16px", height: "100vh", }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Pricing Plans</h1>
        <Row gutter={[16, 16]} justify="center">
          {pricingPlans.map((plan, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                title={plan.title}
                bordered={false}
                style={{
                  borderRadius: '10px',
                  textAlign: 'center',
                  minHeight: '400px',
                }}
              >
                <h2>{plan.price}</h2>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} style={{ padding: '10px 0' }}>
                      <CheckOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button type={plan.buttonType} size="large" style={{ marginTop: '140px' }}>
                  {plan.buttonText}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </MainLayout>
  )
}

export default PricingPage