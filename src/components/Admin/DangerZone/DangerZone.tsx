import { useState } from "react";
import { Modal, Input, Button as AntButton, ConfigProvider, theme } from "antd";
import {
  IoWarningOutline,
  IoPauseCircleOutline,
  IoPlayCircleOutline,
  IoStopCircleOutline,
} from "react-icons/io5";

//React-Toastify
import { toast } from "react-toastify";

const ELECTION_TITLE = "SUG Election 2026";

type ActionKey = "pause" | "resume" | "stop";
type ElectionStatus = "active" | "paused" | "ended";

interface ActionConfig {
  key: ActionKey;
  icon: React.ReactNode;
  title: string;
  description: string;
  confirmPhrase: string;
  buttonLabel: string;
  modalCopy: string;
  disabled: boolean;
  disabledReason?: string;
}

export default function DangerZone() {
  const [status, setStatus] = useState<ElectionStatus>("active");
  const [openAction, setOpenAction] = useState<ActionKey | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const actions: ActionConfig[] = [
    {
      key: "pause",
      icon: <IoPauseCircleOutline className="h-6 w-6 text-[#F09595]" />,
      title: "PAUSE ELECTION",
      description: "Temporarily halt voting. You can resume it later.",
      confirmPhrase: "PAUSE ELECTION",
      buttonLabel: "Pause Election",
      modalCopy: `This stops new votes on ${ELECTION_TITLE} until it's resumed. Votes already cast are kept.`,
      disabled: status !== "active",
      disabledReason: "Only an active election can be paused.",
    },
    {
      key: "resume",
      icon: <IoPlayCircleOutline className="h-6 w-6 text-[#F09595]" />,
      title: "RESUME ELECTION",
      description: "Resume voting on a paused election.",
      confirmPhrase: "RESUME ELECTION",
      buttonLabel: "Resume Election",
      modalCopy: `This reopens ${ELECTION_TITLE} for voting from where it left off.`,
      disabled: status !== "paused",
      disabledReason: "Only a paused election can be resumed.",
    },
    {
      key: "stop",
      icon: <IoStopCircleOutline className="h-6 w-6 text-[#F09595]" />,
      title: "EMERGENCY STOP",
      description: "Immediately and permanently end voting. Cannot be resumed.",
      confirmPhrase: "EMERGENCY STOP",
      buttonLabel: "Emergency Stop",
      modalCopy: `This permanently ends ${ELECTION_TITLE}. Votes already cast are kept, but the election cannot resume afterward. This cannot be undone.`,
      disabled: status === "ended",
      disabledReason: "This election has already ended.",
    },
  ];

  const current = actions.find((a) => a.key === openAction);
  const confirmMatches =
    !!current && confirmText.trim() === current.confirmPhrase;

  const closeModal = () => {
    setOpenAction(null);
    setConfirmText("");
  };

  const handleConfirm = async () => {
    if (!current || !confirmMatches) return;
    setSubmitting(true);
    try {
      // action logic goes here, branch on current.key
      // e.g. await api.post(`/admin/elections/${current.key}`)
      const nextStatus: ElectionStatus =
        current.key === "pause"
          ? "paused"
          : current.key === "resume"
            ? "active"
            : "ended";
      setStatus(nextStatus);
      toast.success(
        `${ELECTION_TITLE} ${current.key === "pause" ? "paused" : current.key === "resume" ? "resumed" : "stopped"}`,
      );
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Couldn't complete that action. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#E24B4A",
          colorBgContainer: "#1A1416",
          colorBgElevated: "#1D1113",
          colorBorder: "rgba(226,75,74,0.35)",
          colorText: "#E5E4EC",
          colorTextPlaceholder: "#8B6D6D",
          borderRadius: 12,
        },
      }}
    >
      <div className="rounded-2xl border border-[#E24B4A]/35 bg-[#1D1113] p-6">
        <div className="mb-5 flex items-start gap-3">
          <IoWarningOutline className="mt-0.5 h-6 w-6 shrink-0 text-[#F09595]" />
          <div>
            <h2 className="text-lg font-bold text-[#F09595]">Danger Zone</h2>
            <p className="text-sm text-[#B08B8B]">
              These actions affect live voting. Please be certain before
              proceeding.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {actions.map((action) => (
            <div
              key={action.key}
              className="rounded-2xl border border-[#E24B4A]/25 bg-[#241417] p-5"
            >
              <div className="mb-2 flex items-center gap-2">
                {action.icon}
                <p className="text-sm font-bold tracking-wide text-white">
                  {action.title}
                </p>
              </div>
              <p className="mb-4 text-sm text-[#B08B8B]">
                {action.description}
              </p>
              <AntButton
                danger
                type="primary"
                disabled={action.disabled}
                onClick={() => setOpenAction(action.key)}
                style={{ fontWeight: 700, height: 42 }}
              >
                {action.buttonLabel}
              </AntButton>
              {action.disabled && action.disabledReason && (
                <p className="mt-2 text-xs text-[#8B6D6D]">
                  {action.disabledReason}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal
        title={current ? `${current.buttonLabel}?` : ""}
        open={!!openAction}
        onCancel={closeModal}
        onOk={handleConfirm}
        okText={current?.buttonLabel}
        okButtonProps={{
          danger: true,
          disabled: !confirmMatches,
          loading: submitting,
        }}
        cancelText="Cancel"
        destroyOnHidden
     
      >
        {current && (
          <>
            <p className="mb-3 text-sm text-slate-400">{current.modalCopy}</p>
            <p className="mb-2 text-sm text-slate-400">
              Type{" "}
              <span className="font-mono font-semibold text-white">
                {current.confirmPhrase}
              </span>{" "}
              to confirm.
            </p>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={current.confirmPhrase}
              autoFocus
            />
          </>
        )}
      </Modal>
    </ConfigProvider>
  );
}
