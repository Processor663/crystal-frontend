import { useState } from "react";
import { useNavigate} from "react-router-dom";

//Icons
import { GoLock } from "react-icons/go";

//ANT Design
import { Form, Input, Button as AntButton } from "antd";
import { Wrapper } from "./forgotPassword.style";

interface ForgotPasswordValues {
  email: string;
}

// interface ForgotPasswordProps {
//   onSubmit?: (email: string) => Promise<void> | void;
// //   onBackToLogin?: () => void;
// }

//This should come from tanstack isPending state
const loading = false;

export default function ForgotPassword() {
  const [form] = Form.useForm<ForgotPasswordValues>();
  const [sentEmail, setSentEmail] = useState("");

  const handleFinish = async (values: ForgotPasswordValues) => {
    //  Logic for forgot-password goes here
    try {
      setSentEmail(values.email);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="flex w-full items-center justify-center px-2 bg-accent">
        <div className="app-container w-full max-w-md md:border md:border-border rounded-2xl p-8 shadow-lg">
          <div className="text-center flex flex-col justify-center items-center ">
            <span className="mb-6 flex justify-center items-center h-11 w-11  rounded-2xl bg-accent">
              <GoLock color="#ffffff" />
            </span>

            <h1 className="mb-1 text-xl font-bold text-white">
              Forgot your password?
            </h1>
            <p className="mb-6 text-sm text-slate-400">
              Enter the email linked to your account and we&apos;ll send you a
              reset link.
            </p>
          </div>

          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={handleFinish}
          >
            <Form.Item
              label={
                <span className="text-sm font-semibold text-white">
                  Email address
                </span>
              }
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email address" },
              ]}
            >
              <Input
                placeholder="you@example.com"
                autoComplete="email"
                className="app-form-input"
              />
            </Form.Item>

            <AntButton
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                background: "#7C6AF4",
                borderColor: "#7C6AF4",
                fontWeight: 700,
                height: 40,
                marginTop: 8,
              }}
            >
              Send reset link
            </AntButton>
          </Form>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 w-full text-center text-sm font-medium text-[#A78BFA] hover:underline"
          >
            ← Go back
          </button>
        </div>
      </div>
    </Wrapper>
  );
}
