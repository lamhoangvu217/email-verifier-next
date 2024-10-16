import MainLayout from '@/components/layouts/MainLayout'
import { pricingPlans } from '@/constants/pricing'
import { userDetailsState } from '@/recoil/atom'
import { CheckOutlined } from '@ant-design/icons'
import { Button, Card, Col, message, Row, Tag } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useRecoilState } from 'recoil'

function PricingPage() {
  const router = useRouter()
  const [userDetail, setUserDetail] = useRecoilState(userDetailsState);
  const updatePlans = async () => {
    const update = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/api/update-plans`, {
      user_type: "Pro"
    }, {
      withCredentials: true
    }).then((res) => {
      setUserDetail(res.data.user)
    }).catch((err) => {
      console.log("err", err);

      message.error("Upgrade Plans error. Please try again")
    })
  }
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
                {userDetail?.user_type === "Pro" && <Tag color="green" style={{ marginBottom: "16px" }}>Current Plan</Tag>}
                
                <h2>{plan.price}</h2>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} style={{ padding: '10px 0' }}>
                      <CheckOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                {userDetail ? (
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
                }

              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </MainLayout>
  )
}

export default PricingPage