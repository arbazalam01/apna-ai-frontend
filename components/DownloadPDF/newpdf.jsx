import { ConfigProvider, Layout } from "antd";

import NewPdfGenerate from "./PdfGenerate/NewPdfGenerate";

const { Content, Sider } = Layout;

const Index = () => {
  return (
    <Layout
      className="layout"
      style={{ minHeight: "100vh", backgroundColor: "#F9F9FC" }}
    >
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Figtree, sans-serif",
          },
          backgroundColor:"transparent"
        }}
      >
        <Content>
          <NewPdfGenerate />
          {/* <FooterComponent /> */}
        </Content>
      </ConfigProvider>
    </Layout>
  );
};
export default Index;
