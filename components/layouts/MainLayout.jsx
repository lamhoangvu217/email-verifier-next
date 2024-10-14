import { routers } from '@/constants/router';
import { Layout, Menu } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
const { Header, Content, Footer } = Layout;
function MainLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname()
  const [selectedKey, setSelectedKey] = useState('');

  // Sync selectedKey with the current route
  useEffect(() => {
    const currentRoute = routers.find((route) => route.link === pathname);
    if (currentRoute) {
      setSelectedKey(currentRoute.key);
    }
  }, [pathname]);

  const handleClick = (link) => {
    router.push(link); // Navigate to the selected page
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
        <h1 style={{
          color: "white",
          padding: "0 24px"
        }}>Emailery</h1>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]} // Set the selected item based on state
          style={{ flex: 1, minWidth: 0 }}
        >
          {routers.map((route) => (
            <Menu.Item key={route.key} onClick={() => handleClick(route.link)}>
              {route.label}
            </Menu.Item>
          ))}
        </Menu>
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