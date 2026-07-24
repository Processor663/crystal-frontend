import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button as AntButton } from "antd";
import { CiCamera } from "react-icons/ci";

//React-Toastify
import { toast } from "react-toastify";

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  nin: string;
  avatarInitials: string;
}

interface PasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface SettingsPageProps {
  profile?: UserProfile;

}

const defaultProfile: UserProfile = {
  fullName: "Adebayo Ogundimu",
  email: "adebayo.o@example.com",
  phone: "+234 801 234 5678",
  role: "Candidate",
  nin: "••••••4782",
  avatarInitials: "AO",
};


export default function SettingsPage({
  profile = defaultProfile,
}: SettingsPageProps) {
  const [formState] = useState<UserProfile>(profile);
  const [showPasswordPanel, setShowPasswordPanel] = useState(false);
  const [passwordForm] = Form.useForm<PasswordFormValues>();

  const handleAvatarClick = () => {
    // upload image Logic goes here
  };

  //it will come from tantack
  const isLoading = true;

  const handlePasswordSubmit = (values: PasswordFormValues) => {
    try {
      // handle password logic goes here
      console.log(values)

      toast.success("Password changed successfully!");
      passwordForm.resetFields();
      setShowPasswordPanel(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  //Navigate
  const navigate = useNavigate();

  return (
    <div className="w-full bg-surface shadow-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-400">
          Manage your profile and account preferences
        </p>
      </div>

      <div className="space-y-8 p-6 border border-border rounded-2xl">
        {/* Profile section */}
        <div className="space-y-6 ">
          <h2 className="text-base font-bold text-white">Profile</h2>

          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7C6AF4]/20 text-lg font-bold text-[#A78BFA]">
                {formState.avatarInitials}
              </span>
              <button
                type="button"
                onClick={handleAvatarClick}
                className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#0D0F14] bg-[#7C6AF4] text-white hover:bg-[#6D5AE0]"
                aria-label="Upload profile photo"
              >
                <CiCamera className="h-3 w-3" />
              </button>
            </div>
            <div>
              <p className="text-base font-bold text-white">
                {formState.fullName}
              </p>
              <p className="text-sm text-slate-400">{formState.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="border border-border rounded-2xl bg-bg p-3">
              {formState.fullName}
            </div>
            <div className="border border-border rounded-2xl bg-bg p-3">
              {formState.email}
            </div>
            <div className="border border-border rounded-2xl bg-bg p-3">
              {formState.phone}
            </div>
            <div className="border border-border rounded-2xl bg-bg p-3">
              {formState.nin}
            </div>
          </div>
        </div>

        {/* Password section */}
        <div className="mt-15">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-text">Change password</p>

            <button
              type="button"
              onClick={() => setShowPasswordPanel((prev) => !prev)}
              className="text-xs rounded-xl border border-accent/40 px-4 py-2   text-accent hover:bg-accent/10"
            >
              {showPasswordPanel ? "Cancel" : "Change password"}
            </button>
          </div>

          {showPasswordPanel && (
            <div className="rounded-2xl md:border border-border p-6">
              <Form
                form={passwordForm}
                layout="vertical"
                requiredMark={false}
                onFinish={handlePasswordSubmit}
              >
                <Form.Item
                  label={
                    <span className="text-sm font-semibold text-white">
                      Old password
                    </span>
                  }
                  name="oldPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your current password",
                    },
                  ]}
                >
                  <Input.Password autoComplete="current-password" />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-sm font-semibold text-white">
                      New password
                    </span>
                  }
                  name="newPassword"
                  rules={[
                    { required: true, message: "Please enter a new password" },
                    {
                      validator: (_, value: string) => {
                        if (!value) return Promise.resolve();
                        const longEnough = value.length >= 8;
                        if (longEnough) return Promise.resolve();
                        return Promise.reject(
                          new Error("Use at least 8 characters"),
                        );
                      },
                    },
                  ]}
                >
                  <Input.Password autoComplete="new-password" />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-sm font-semibold text-white">
                      Confirm new password
                    </span>
                  }
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your new password",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value)
                          return Promise.resolve();
                        return Promise.reject(
                          new Error("Passwords don't match"),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password autoComplete="new-password" />
                </Form.Item>

                <p className="mb-5 text-xs text-slate-500">
                  Make sure it's at least 8 characters.
                </p>

                <div className="flex items-center gap-5">
                  <AntButton
                    type="primary"
                    htmlType="submit"
                    style={{
                      background: "#7C6AF4",
                      borderColor: "#7C6AF4",
                      fontWeight: 700,
                      height: 40,
                    }}
                    loading={isLoading}
                  >
                    Update password
                  </AntButton>
                  <button
                    onClick={() => navigate("../forgot-password")}
                    className="text-sm font-medium text-[#A78BFA] hover:underline"
                  >
                    I forgot my password
                  </button>
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
