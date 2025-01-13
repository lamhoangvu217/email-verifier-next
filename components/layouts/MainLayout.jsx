import EmaileryLogo from "@/assets/emailery-logo.png";
import { routers } from '@/constants/router';
import { Layout, Menu } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
const { Header, Content, Footer } = Layout;

function MainLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState('');
  useEffect(() => {
    const currentRoute = routers.find((route) => route.link === pathname);
    if (currentRoute) {
      setSelectedKey(currentRoute.key);
    }
  }, [pathname]);
  const handleClick = (link) => {
    router.push(link);
  };
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
        <Image src={EmaileryLogo} alt='' width={200} height={200} />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          style={{ flex: 1, minWidth: 0 }}
        >
          {routers.map((route) => (
            <Menu.Item key={route.key} onClick={() => handleClick(route.link)} style={{
              backgroundColor: "transparent",
            }}>
              {route.label}
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content>
        <div
          style={{
            minHeight: 380,
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