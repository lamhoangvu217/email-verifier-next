import { userDetailsState } from '@/recoil/atom';
import { Button, Flex } from 'antd';
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil';
import ModalCancelPlan from './ModalCancelPlan';
import { useRouter } from 'next/navigation';

function Plans() {
    const router = useRouter()
    const userDetail = useRecoilValue(userDetailsState);
    const [modalCancelPlanOpen, setModalCancelPlanOpen] = useState(false)
    const handleChangePlan = () => {
        setModalCancelPlanOpen(true)
    }
    return (
        <Flex vertical align='flex-start' gap={8}>
            <span>
                Your plan: {userDetail?.user_type}
            </span>
            {userDetail?.user_type === "Pro" && <Button onClick={handleChangePlan} danger variant="solid">Cancel plan</Button>}
            {userDetail?.user_type ==="Free" && <Button onClick={() => router.push("/pricing")}>Upgrade</Button>}   
            <ModalCancelPlan isModalCancelPlanOpen={modalCancelPlanOpen} setIsModalCancelPlanOpen={setModalCancelPlanOpen} />
        </Flex>
    )
}

export default Plans