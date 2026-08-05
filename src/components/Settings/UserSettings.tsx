import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button as AntButton } from "antd";
import { CiCamera } from "react-icons/ci";

//React-Toastify
import { toast } from "react-toastify";

//Styles
import { Wrapper } from "./Settings.styles";

//HOOKS
import { useAuthUser } from "@/hooks/useAuthUser";

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  nin: string;
  manifesto: string;
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

interface ManifestoFormValues {
  manifesto: string;
}

const defaultProfile: UserProfile = {
  fullName: "Adebayo Ogundimu",
  email: "adebayo.o@example.com",
  phone: "+234 801 234 5678",
  role: "Presidential Candidate",
  nin: "••••••4782",
  manifesto:
    "I am committed to transparent leadership, student welfare, academic excellence, and innovation. Together, we will create opportunities, strengthen representation, and build a better community for all.",
  avatarInitials: "AO",
};

export default function SettingsPage({
  profile = defaultProfile,
}: SettingsPageProps) {
  const { role } = useAuthUser();
  //it will come from tantack
  const isLoading = false;

  const [formState] = useState<UserProfile>(profile);
  const [passwordForm] = Form.useForm<PasswordFormValues>();

  const [manifestoForm] = Form.useForm<ManifestoFormValues>();

  const handleManifestoSubmit = (values: ManifestoFormValues) => {
    try {
      // handle manifesto save logic goes here
      console.log(values);

      toast.success("Manifesto saved successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const handleAvatarClick = () => {
    // upload image Logic goes here
  };

  const handlePasswordSubmit = (values: PasswordFormValues) => {
    try {
      // handle password logic goes here
      console.log(values);

      toast.success("Password changed successfully!");
      passwordForm.resetFields();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  //Navigate
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="w-full bg-surface shadow-lg">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white">Settings</h1>
          <p className="text-sm text-slate-400">
            Manage your profile and account preferences
          </p>
        </div>

        <div className="space-y-8 p-6 border border-border rounded-2xl">
          {/* Profile section */}
          <div className="space-y-6  text-text">
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
            {role === "CANDIDATE" && (
              <div className="text-muted border border-border  md:p-5 rounded-2xl">
                <p className="text-sm text-text mb-3 pt-3 pl-5 md:pt-0 md:pl-0">
                  Manifesto:
                </p>
                <div className="bg-surface2 text-text p-5 rounded-2xl rounded-t md:rounded-t-2xl">
                  {formState.manifesto}
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-sm mt-10">
              <div className="border border-border rounded-2xl bg-surface2 p-3 pl-4">
                {formState.fullName}
              </div>
              <div className="border border-border rounded-2xl bg-surface2 p-3 pl-4">
                {formState.email}
              </div>
              <div className="border border-border rounded-2xl bg-surface2 p-3 pl-4">
                {formState.phone}
              </div>
              <div className="border border-border rounded-2xl bg-surface2 p-3 pl-4">
                {formState.nin}
              </div>
            </div>
          </div>
          {/* Manifesto section */}
          {role === "CANDIDATE" && (
            <div className="mt-10">
              <div className="mb-5 flex items-center justify-between"></div>
              <div className="rounded-2xl md:border border-border md:p-6">
                <Form
                  form={manifestoForm}
                  layout="vertical"
                  requiredMark={false}
                  // initialValues={{ manifesto: formState.manifesto }}
                  onFinish={handleManifestoSubmit}
                >
                  <Form.Item
                    label={
                      <span className="text-sm font-semibold text-white">
                        Edit manifesto
                      </span>
                    }
                    name="manifesto"
                    rules={[
                      {
                        required: true,
                        message: "Please write your manifesto",
                      },
                      {
                        max: 600,
                        message: "Manifesto must be 600 characters or less",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={6}
                      maxLength={200}
                      showCount
                      className="app-form-input"
                      placeholder="Tell voters what you stand for and what you plan to do if elected..."
                    />
                  </Form.Item>

                  <p className="mb-5 text-xs text-[#F4A623]">
                    Note: This is shown to voters on your candidate card.
                  </p>

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
                    Save Manifesto
                  </AntButton>
                </Form>
              </div>
            </div>
          )}
          {/* Manifesto section */}

          {/* Password section */}
          <div className="mt-15">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-text">Change password</p>
            </div>
            <div className="rounded-2xl md:border border-border md:p-6">
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
                  <Input.Password
                    autoComplete="current-password"
                    className="app-form-input"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-sm font-semibold text-white">
                      New password
                    </span>
                  }
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a new password",
                    },
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
                  <Input.Password
                    autoComplete="new-password"
                    className="app-form-input"
                  />
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
                  <Input.Password
                    autoComplete="new-password"
                    className="app-form-input"
                  />
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
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
