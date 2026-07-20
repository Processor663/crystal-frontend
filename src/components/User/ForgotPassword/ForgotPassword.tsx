import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Icons
import { GoLock } from "react-icons/go";

//ANT Design
import { Form, Input, Button as AntButton } from "antd";

interface ForgotPasswordValues {
  email: string;
}

// interface ForgotPasswordProps {
//   onSubmit?: (email: string) => Promise<void> | void;
// //   onBackToLogin?: () => void;
// }

  //This should come from tanstack isPending state
  const loading = true;

export default function ForgotPassword() {
  const [form] = Form.useForm<ForgotPasswordValues>();
  const [sentEmail, setSentEmail] = useState("");

  const handleFinish = async (values: ForgotPasswordValues) => {
  

    try {
      await onSubmit?.(values.email);
      setSentEmail(values.email);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="flex  w-full items-center justify-center p-6 mt-15 ">
      <div className="w-full max-w-md md:border md:border-border rounded-2xl p-8 shadow-lg">
        <span className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7C6AF4]">
          <GoLock color="#ffffff" />
        </span>

        <h1 className="mb-1 text-xl font-bold text-white">
          Forgot your password?
        </h1>
        <p className="mb-6 text-sm text-slate-400">
          Enter the email linked to your account and we&apos;ll send you a reset
          link.
        </p>

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
            <Input placeholder="you@example.com" autoComplete="email" />
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
          onClick={() => navigate("..")}
          className="mt-6 w-full text-center text-sm font-medium text-[#A78BFA] hover:underline"
        >
          ← Back to home
        </button>
      </div>
    </div>
  );
}
