import { useState } from "react";
import { Modal, Input, Button as AntButton, ConfigProvider, theme } from "antd";
import { IoWarningOutline, IoPowerOutline } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";

//React-Toastify
import { toast } from "react-toastify";

interface DangerZoneProps {
  activeElectionTitle: string;
}

export default function DangerZone({ activeElectionTitle }: DangerZoneProps) {
  const [bossModalOpen, setBossModalOpen] = useState(false);
  const [bossConfirmText, setBossConfirmText] = useState("");
  const [bossSubmitting, setBossSubmitting] = useState(false);

  const [endModalOpen, setEndModalOpen] = useState(false);
  const [endReason, setEndReason] = useState("");
  const [endSubmitting, setEndSubmitting] = useState(false);

  const bossConfirmMatches = bossConfirmText.trim() === "RESET ELECTION";

  const handleStartBossElection = async () => {
    if (!bossConfirmMatches) return;
    setBossSubmitting(true);
    try {
      // reset + start new election logic goes here
      // e.g. await api.post("/admin/elections/boss-reset")
      toast.success("Election reset. A new election has been started.");
      setBossModalOpen(false);
      setBossConfirmText("");
    } catch (error) {
      console.log(error);
      toast.error("Couldn't reset the election. Try again.");
    } finally {
      setBossSubmitting(false);
    }
  };

  const handleEndElection = async () => {
    if (endReason.trim().length < 10) return;
    setEndSubmitting(true);
    try {
      // end election logic goes here
      // e.g. await api.post(`/admin/elections/end`, { reason: endReason })
      toast.success(`${activeElectionTitle} ended`);
      setEndModalOpen(false);
      setEndReason("");
    } catch (error) {
      console.log(error);
      toast.error("Couldn't end the election. Try again.");
    } finally {
      setEndSubmitting(false);
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
              These actions are irreversible. Please be certain before
              proceeding.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Boss election */}
          <div className="rounded-2xl border border-[#E24B4A]/25 bg-[#241417] p-5">
            <div className="mb-2 flex items-center gap-2">
              <CiCircleCheck className="h-6 w-6 text-[#F09595]" />
              <p className="text-sm font-bold tracking-wide text-white">
                BOSS ELECTION
              </p>
            </div>
            <p className="mb-4 text-sm text-[#B08B8B]">
              Reset and start a completely new election.
            </p>
            <AntButton
              danger
              type="primary"
              onClick={() => setBossModalOpen(true)}
              style={{ fontWeight: 700, height: 42 }}
            >
              Start Boss Election
            </AntButton>
          </div>

          {/* End election */}
          <div className="rounded-2xl border border-[#E24B4A]/25 bg-[#241417] p-5">
            <div className="mb-2 flex items-center gap-2">
              <IoPowerOutline className="h-6 w-6 text-[#F09595]" />
              <p className="text-sm font-bold tracking-wide text-white">
                END ELECTION
              </p>
            </div>
            <p className="mb-4 text-sm text-[#B08B8B]">
              Immediately end the current election and stop voting.
            </p>
            <AntButton
              danger
              type="primary"
              onClick={() => setEndModalOpen(true)}
              style={{ fontWeight: 700, height: 42 }}
            >
              End Election
            </AntButton>
          </div>
        </div>
      </div>

      {/* Boss election confirmation */}
      <Modal
        title="Reset and start a new election?"
        open={bossModalOpen}
        onCancel={() => {
          setBossModalOpen(false);
          setBossConfirmText("");
        }}
        onOk={handleStartBossElection}
        okText="Start Boss Election"
        okButtonProps={{
          danger: true,
          disabled: !bossConfirmMatches,
          loading: bossSubmitting,
        }}
        cancelText="Cancel"
        destroyOnClose
      >
        <p className="mb-3 text-sm text-slate-400">
          This permanently ends{" "}
          <span className="font-semibold text-white">
            {activeElectionTitle}
          </span>{" "}
          and every result tied to it, then starts a brand new election from
          scratch. This cannot be undone.
        </p>
        <p className="mb-2 text-sm text-slate-400">
          Type{" "}
          <span className="font-mono font-semibold text-white">
            RESET ELECTION
          </span>{" "}
          to confirm.
        </p>
        <Input
          value={bossConfirmText}
          onChange={(e) => setBossConfirmText(e.target.value)}
          placeholder="RESET ELECTION"
        />
      </Modal>

      {/* End election confirmation */}
      <Modal
        title="End this election?"
        open={endModalOpen}
        onCancel={() => {
          setEndModalOpen(false);
          setEndReason("");
        }}
        onOk={handleEndElection}
        okText="End Election"
        okButtonProps={{
          danger: true,
          disabled: endReason.trim().length < 10,
          loading: endSubmitting,
        }}
        cancelText="Cancel"
        destroyOnClose
      >
        <p className="mb-3 text-sm text-slate-400">
          This immediately closes{" "}
          <span className="font-semibold text-white">
            {activeElectionTitle}
          </span>{" "}
          to new votes. Votes already cast are kept. This action is logged and
          cannot be undone.
        </p>
        <Input.TextArea
          rows={3}
          value={endReason}
          onChange={(e) => setEndReason(e.target.value)}
          placeholder="Reason for ending this election (minimum 10 characters)"
        />
      </Modal>
    </ConfigProvider>
  );
}
