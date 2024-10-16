import { routers } from '@/constants/router';
import { userDetailsState } from '@/recoil/atom';
import { Avatar, Button, Dropdown, Flex, Layout, Menu, message } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
const { Header, Content, Footer } = Layout;

function MainLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [userDetail, setUserDetail] = useRecoilState(userDetailsState);
  const [selectedKey, setSelectedKey] = useState('');

  const handleLogout = async () => {
    const logout = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/api/logout`, {}, {
      withCredentials: true
    }).then((res) => {
      if (res.status === 200) {
        message.success(res.data.message ? res.data.message : "Logout Successfully!");
        setUserDetail(null)
      }
    }).catch((err) => {
      console.log("err", err);

    })
  }
  const avatarDropdownMenu = [
    {
      key: '1',
      label: (
        <div onClick={() => router.push("/account")}>Account Settings</div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={handleLogout}>Logout</div>
      ),
    },
  ]
  useEffect(() => {
    const currentRoute = routers.find((route) => route.link === pathname);
    if (currentRoute) {
      setSelectedKey(currentRoute.key);
    }
  }, [pathname]);
  const handleClick = (link) => {
    router.push(link);
  };
  const handleLogin = () => {
    router.push('/login');
  };
  const handleSignUp = () => {
    router.push('/sign-up');
  };
  const getUserDetail = async () => {
    const userDetailGet = await axios.get(`${process.env.NEXT_PUBLIC_URL_BASE}/api/user`, {
      withCredentials: true
    }).then((res) => {
      setUserDetail(res?.data?.user)
    }).catch((err) => {
      console.log("err", er);
      message.error("get user detail error")
    })
  }
  useEffect(() => {
    const accessToken = Cookies.get("jwt")
    if (accessToken) {
      getUserDetail()
    }
  }, [])
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <h1 style={{
          color: "white",
          padding: "0 24px"
        }}>Emailery</h1>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          style={{ flex: 1, minWidth: 0 }}
        >
          {routers.map((route) => (
            <Menu.Item key={route.key} onClick={() => handleClick(route.link)}>
              {route.label}
            </Menu.Item>
          ))}
        </Menu>
        {userDetail
          ?
          <Dropdown menu={{ items: avatarDropdownMenu }}>
            <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
          </Dropdown>
          :
          <Flex gap={8}>
            <Button
              type="primary"
              style={{ marginLeft: 'auto' }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              type="text"
              style={{ marginLeft: 'auto', color: "white" }}
              onClick={handleSignUp}
            >
              Sign up
            </Button>
          </Flex>
        }


      </Header>
      <Content>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            borderRadius: "8px",
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Emailery ©{new Date().getFullYear()} created by LamVuHoang
      </Footer>
    </Layout>
  )
}

export default MainLayout