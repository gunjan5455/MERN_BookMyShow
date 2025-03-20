import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;
function Navbar() {
  const navItems = [
    {
      label: "Home",
    },

    {
      label: "Gunjan",
    },
  ];
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          display: "Flex",
          alignItems: "center",
        }}
      >
        <h3 className="text-white m-0">BookMyShow</h3>

        <Menu theme="dark" mode="horizontal" items={navItems} />
      </Header>
    </Layout>
  );
}
export default Navbar;
