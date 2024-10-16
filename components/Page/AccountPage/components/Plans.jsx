import { userDetailsState } from '@/recoil/atom';
import { Button, Flex } from 'antd';
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil';

function Plans() {
    const userDetail = useRecoilValue(userDetailsState);
    const [modalCancelPlanOpen, setModalCancelPlanOpen] = useState(false)
    const handleChangePlan = () => {

    }
    return (
        <Flex vertical align='flex-start' gap={8}>
            <span>
                Your plan: {userDetail?.user_type}
            </span>
            <Button onClick={handleChangePlan} danger variant="solid">Cancel plan</Button>
        </Flex>
    )
}

export default Plans