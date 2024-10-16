import MainLayout from "@/components/layouts/MainLayout";
import { Tabs } from "antd";
import AccountInfo from "./components/AccountInfo";
import Plans from "./components/Plans";
import { useRecoilValue } from "recoil";
import { userDetailsState } from "@/recoil/atom";

const tabs = [
  {
    key: "1",
    label: "Account info",
    children: <AccountInfo />
  },
  {
    key: "2",
    label: "Plans",
    children: <Plans />
  }
]
function AccountPage() {
  
  return (  
    <MainLayout>
      <Tabs
        tabPosition={"left"}
        items={tabs}
      />
    </MainLayout>
  )
}

export default AccountPage