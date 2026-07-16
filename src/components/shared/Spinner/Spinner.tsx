import { ConfigProvider, Spin } from "antd";
import Logo from "../Logo/Logo";

export default function App_Spinner() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#e8eaf2", // Purple
          },
        }}
      >
        <div className="w-full h-full fixed bg-bg flex flex-col items-center justify-center space-y-4">
          <Logo />
          <Spin size="large" />
        </div>
      </ConfigProvider>
    </>
  );
}
