import { Layout, Typography } from "antd";
import Login from "@components/Login";
import { Link } from "react-router-dom";
const { Content } = Layout;

const { Text } = Typography;

const bodyCss = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const AppLayout = () => {
  return (
    <Layout
      className="layout"
      style={{ background: "#F2F2F2", minHeight: "100vh" }}
    >
      {/* <HeaderComponent showSignOut={false} /> */}
      <Content style={bodyCss}>
        <Login />
      </Content>
      <Text
        style={{
          fontSize: "18px",
          fontWeight: "400",
          textAlign: "center",
          marginBottom: "5rem",
        }}
      >
        Don't have an account? {" "}
        <Link to="/signup" style={{ color: "#3B3BB6", textDecoration: "none" }}>
          Sign Up
        </Link>
      </Text>
      
      {/* <FooterComponent /> */}
    </Layout>
  );
};

export default AppLayout;
