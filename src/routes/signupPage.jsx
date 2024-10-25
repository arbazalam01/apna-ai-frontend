import { Layout, Typography } from "antd";
import Signup from "../../components/Signup";
import { Link } from "react-router-dom";
const { Content } = Layout;

const { Text } = Typography;

const bodyCss = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const SignupLayout = () => {
  return (
    <Layout
      className="layout"
      style={{ background: "#F2F2F2", minHeight: "100vh" }}
    >
      {/* <HeaderComponent showSignOut={false} /> */}
      <Content style={bodyCss}>
        <Signup />
      </Content>
      <Text
        style={{
          fontSize: "18px",
          fontWeight: "400",
          textAlign: "center",
          marginBottom: "5rem",
          marginTop: "1rem",
        }}
      >
        Already have account ?
        <Link to="/login" style={{ color: "#3B3BB6", textDecoration: "none" }}>
          Login
        </Link>
      </Text>
      <Text
        style={{
          fontSize: "18px",
          fontWeight: "400",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        copyright shaiping inc .
      </Text>
      {/* <FooterComponent /> */}
    </Layout>
  );
};

export default SignupLayout;
