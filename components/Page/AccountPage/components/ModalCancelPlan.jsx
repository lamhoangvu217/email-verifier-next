import { userDetailsState } from '@/recoil/atom';
import { message, Modal } from 'antd'
import axios from 'axios'
import React from 'react'
import { useRecoilState } from 'recoil';

function ModalCancelPlan({ isModalCancelPlanOpen, setIsModalCancelPlanOpen }) {
  const [userDetail, setUserDetail] = useRecoilState(userDetailsState);
  const updatePlans = async () => {
    const update = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/api/update-plans`, {
      user_type: "Free"
    }, {
      withCredentials: true
    }).then((res) => {
      setUserDetail(res.data.user)
      message.success("Cancel plan successfully. You are in Free plan")
    }).catch((err) => {
      message.error("Upgrade Plans error. Please try again")
    })
  }
  const handleOk = () => {
    setIsModalCancelPlanOpen(false)
    updatePlans()
  }
  const handleCancel = () => {
    setIsModalCancelPlanOpen(false)
  }
  return (
    <Modal title="Are you sure to cancel Pro plan?" open={isModalCancelPlanOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>All the Pro feature will be lost but you can subscribe again anytime</p>
    </Modal>
  )
}

export default ModalCancelPlan