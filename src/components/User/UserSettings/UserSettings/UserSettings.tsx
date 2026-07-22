import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button as AntButton } from "antd";
import { CiCamera } from "react-icons/ci";

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
  onSaveProfile?: (profile: UserProfile) => void;
  onChangePassword?: (currentPassword: string, newPassword: string) => void;

  onUploadAvatar?: (file: File) => void;
}

const defaultProfile: UserProfile = {
  fullName: "Adebayo Ogundimu",
  email: "adebayo.o@example.com",
  phone: "+234 801 234 5678",
  role: "Candidate",
  nin: "••••••4782",
  avatarInitials: "AO",
};



function Field({
  label,
  value,
  onChange,
  disabled,
  type = "text",
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
  type?: string;
}) {

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-slate-400">{label}</span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[#7C6AF4]/50 ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
      />
    </label>
  );
}

export default function SettingsPage({
  profile = defaultProfile,
  onSaveProfile,
  onChangePassword,
  onUploadAvatar,
}: SettingsPageProps) {
  const [formState, setFormState] = useState<UserProfile>(profile);
  const [showPasswordPanel, setShowPasswordPanel] = useState(true);
  const [passwordForm] = Form.useForm<PasswordFormValues>();

  const updateField = (key: keyof UserProfile) => (value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveProfile = () => {
    onSaveProfile?.(formState);
  };

  const handleAvatarClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) onUploadAvatar?.(file);
    };
    input.click();
  };

  const handlePasswordSubmit = (values: PasswordFormValues) => {
    onChangePassword?.(values.oldPassword, values.newPassword);
    passwordForm.resetFields();
    setShowPasswordPanel(false);
  };
  const navigate = useNavigate();

  return (
    <div className="w-full rounded-2xl border border-white/5 bg-[#0D0F14] shadow-lg">
      <div className="border-b border-white/5 p-6">
        <h1 className="text-xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-400">
          Manage your profile and account preferences
        </p>
      </div>

      <div className="space-y-8 p-6">
        {/* Profile section */}
        <div className="space-y-6">
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
            <Field
              label="Full name"
              value={formState.fullName}
              onChange={updateField("fullName")}
            />
            <Field
              label="Email address"
              value={formState.email}
              onChange={updateField("email")}
              type="email"
            />
            <Field
              label="Phone number"
              value={formState.phone}
              onChange={updateField("phone")}
            />
            <Field label="NIN" value={formState.nin} disabled />
          </div>

          <p className="text-sm text-slate-400">
            NIN and role assignment are verified fields and can&apos;t be edited
            here. Contact support if these are incorrect.
          </p>

          <button
            type="button"
            onClick={handleSaveProfile}
            className="rounded-xl bg-[#7C6AF4] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#6D5AE0]"
          >
            Save changes
          </button>
        </div>

        <div className="h-px w-full bg-white/5" />

        {/* Password section */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Change password</h2>
            {!showPasswordPanel && (
              <button
                type="button"
                onClick={() => setShowPasswordPanel(true)}
                className="rounded-xl border border-[#7C6AF4]/40 px-4 py-2 text-sm font-semibold text-[#A78BFA] hover:bg-[#7C6AF4]/10"
              >
                Change password
              </button>
            )}
          </div>

          {showPasswordPanel && (
            <div className="rounded-2xl border border-white/5 p-6">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-slate-400">
                  Update your password to keep your account secure
                </p>
                <button
                  type="button"
                  onClick={() => {
                    passwordForm.resetFields();
                    setShowPasswordPanel(false);
                  }}
                  className="rounded-lg border border-white/10 px-4 py-1.5 text-sm text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>

              <Form
                form={passwordForm}
                layout="vertical"
                requiredMark={false}
                onFinish={handlePasswordSubmit}
                className="max-w-sm crystal-password-form"
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
                        const longEnough = value.length >= 15;
                        const hasNumber = /\d/.test(value);
                        const hasLower = /[a-z]/.test(value);
                        const meetsShortRule =
                          value.length >= 8 && hasNumber && hasLower;
                        if (longEnough || meetsShortRule)
                          return Promise.resolve();
                        return Promise.reject(
                          new Error(
                            "Use at least 15 characters, or 8+ with a number and lowercase letter",
                          ),
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
                  >
                    Update password
                  </AntButton>
                    <button onClick={() => navigate("../forgot-password")}
                  
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
