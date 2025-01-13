import MainLayout from '@/components/layouts/MainLayout'
import { pricingPlans } from '@/constants/pricing'
import { CheckOutlined } from '@ant-design/icons'
import { Card, Col, Row, Tag } from 'antd'

function PlanPage() {
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
                <Tag color="green" style={{ marginBottom: "16px" }}>Current Plan</Tag>
                
                <h2>{plan.price}</h2>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} style={{ padding: '10px 0' }}>
                      <CheckOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                {/* {userDetail ? (
                  <>
                    {userDetail?.user_type === "Pro" ? <Button type="default" size="large" style={{ marginTop: '140px' }} onClick={() => router.push("/account")}>
                      Manage your plan
                    </Button> : <Button type="primary" size="large" style={{ marginTop: '140px' }} onClick={updatePlans}>
                      Upgrade to Pro
                    </Button>}
                  </>
                ) : <Button type="primary" size="large" style={{ marginTop: '140px' }} onClick={() => router.push("/sign-up")}>
                  Get started
                </Button>
                } */}

              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </MainLayout>
  )
}

export default PlanPage