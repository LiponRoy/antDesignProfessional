import {
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Layout, Menu, theme, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import AppRoutes from "../routes/AppRoutes";
const { Header, Sider, Content } = Layout;
const DeshBoardLayout = () => {
  // for
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  // End for

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div className=" h-[vh] w-full flex justify-center items-center p-2">
      <Layout className=" h-full border-4 border-[#f542bf] rounded-lg p-4">
        {/* Side Bar Start */}
        <Sider
          className="rounded-xl"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="demo-logo-vertical" />

          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#f542bf",
              },
            }}
          >
            <Menu
              className="h-full w-full flex flex-col justify-start items-center p-4 rounded-md bg-white"
              // theme="dark"
              mode="inline"
              // defaultSelectedKeys={['1']}
              onClick={(item) => {
                //item.key
                navigate(item.key);
              }}
              selectedKeys={[selectedKeys]}
              items={[
                {
                  label: "Inventory",
                  key: "/inventory",
                  icon: <ShopOutlined />,
                },
                {
                  label: "Orders",
                  key: "/orders",
                  icon: <ShoppingCartOutlined />,
                },
                {
                  label: "Customers",
                  key: "/customers",
                  icon: <UserOutlined />,
                },
              ]}
            />
          </ConfigProvider>
        </Sider>
        {/* Side Bar End */}
        {/* Right Layout Start */}
        <Layout>
         {/* Header Start */}
         <Header
            className=" mx-4 flex justify-between items-center rounded-md"
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuFoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                marginLeft: "10px",
              }}
            />

            <div className=" flex justify-center items-center gap-x-2 pr-4">
              <span className="text-sm md:text-lg">Bangladesh-Food</span>
            </div>
            <div className=" flex justify-center items-center gap-x-2 pr-4">
              <UserOutlined />
              <UserOutlined />
              <UserOutlined />
              <UserOutlined />
            </div>
          </Header>
         {/* Header End */}
          {/* Right Main Content Start */}
          <Content
            className=" mx-4 mt-4 p-4 h-full bg-white rounded-md"
            // style={{
            //   margin: '24px 16px',
            //   padding: 24,
            //   minHeight: 280,
            //   background: colorBgContainer,
            // }}
          >
            <AppRoutes></AppRoutes>
          </Content>
          {/* Right Main Content End */}
        </Layout>
        {/* Right Layout End */}
      </Layout>
    </div>
  );
};
export default DeshBoardLayout;
