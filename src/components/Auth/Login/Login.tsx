import { useNavigate } from "react-router-dom";
import { Form, Input, Checkbox, Button, ConfigProvider, theme } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

//styles
import { Wrapper } from "./Login.styles";

//components
import Logo from "@/components/shared/Logo/Logo";

interface SignInFormValues {
  identifier: string;
  password: string;
  remember: boolean;
}

export default function SignInForm() {
  const [form] = Form.useForm<SignInFormValues>();

  const navigate = useNavigate();

  const handleFinish = (values: SignInFormValues) => {
    // Wire this up to your auth call (e.g. Better-Auth sign-in)
    if (values) {
      navigate("me");
    }
    console.log("Sign in submitted:", values);
  };
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#7c6ff0",
          colorBgContainer: "#171526",
          colorBorder: "#2c2942",
          colorText: "#e7e5f5",
          colorTextPlaceholder: "#6f6b8a",
          // borderRadius: 12,
          // fontFamily:
          //   "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
        components: {
          Input: {
            controlHeight: 40,
          },
          Button: {
            controlHeight: 40,
            fontWeight: 600,
            colorPrimaryHover: "#ffffff",
          },
        },
      }}
    >
      <Wrapper>
        <div className="cv-signin-page">
          <Logo />

          <div className="cv-signin-card">
            <div className="cv-signin-header">
              <h1 className="cv-signin-title">Welcome back</h1>
              <p className="cv-signin-subtitle">
                Sign in to access your dashboard
              </p>
            </div>

            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              initialValues={{ remember: true }}
              onFinish={handleFinish}
              className="cv-signin-form"
            >
              <Form.Item
                name="identifier"
                label="Email address or NIN"
                rules={[
                  {
                    required: true,
                    message: "Enter your email or NIN to continue",
                  },
                ]}
              >
                <Input placeholder="e.g. voter@email.com or 12345678901" />
              </Form.Item>

              <Form.Item
                name="password"
                label={
                  <div className="cv-password-label-row">
                    <span>Password</span>
                  </div>
                }
                rules={[{ required: true, message: "Enter your password" }]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  iconRender={(visible) => (visible ? "HIDE" : "SHOW")}
                />
              </Form.Item>

              <div className="cv-row-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <span className="cv-status-pill">
                  <a className="cv-forgot-link" href="#">
                    Forgot password?
                  </a>
                </span>
              </div>

              <Form.Item className="cv-submit-item">
                <Button htmlType="submit" block icon={<ArrowRightOutlined />}>
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <div className="cv-divider">
              <span>or continue with</span>
            </div>

            <div className="cv-oauth-row"></div>

            <p className="cv-signup-line">
              Don&apos;t have an account?{" "}
              <a href="/register">Create one &rarr;</a>
            </p>
          </div>
        </div>
      </Wrapper>
    </ConfigProvider>
  );
}
