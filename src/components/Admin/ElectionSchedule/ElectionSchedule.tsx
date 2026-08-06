import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Button as AntButton,
  ConfigProvider,
  theme,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { FiPlay, FiSquare } from "react-icons/fi";

//React-Toastify
import { toast } from "react-toastify";
import { Wrapper } from "./ElectionSchedule.styles";

export interface Election {
  title: string;
  startsAt: string; // ISO string
  endsAt: string; // ISO string
}

interface CreateElectionValues {
  title: string;
  startsAt: Dayjs;
  endsAt: Dayjs;
}

interface EditScheduleValues {
  startsAt: Dayjs;
  endsAt: Dayjs;
}

const defaultElection: Election = {
  title: "SUG Election 2026",
  startsAt: dayjs().subtract(1, "day").toISOString(),
  endsAt: dayjs().add(2, "day").add(14, "hour").toISOString(),
};

function getStartStatus(startsAt: string) {
  const started = dayjs().isAfter(dayjs(startsAt));
  return started
    ? {
        label: "Started",
        className:
          "bg-[#152926] text-[#6ec790] border border-[#22c55e33] font-mono",
      }
    : { label: "Upcoming", className: "bg-[#412402] text-[#EF9F27] font-mono" };
}

function getEndStatus(startsAt: string, endsAt: string) {
  const now = dayjs();
  if (now.isBefore(dayjs(startsAt))) {
    return { label: "Not started", className: "bg-surface2 text-slate-400 " };
  }
  if (now.isAfter(dayjs(endsAt))) {
    return { label: "Ended", className: "bg-surface2 text-slate-400" };
  }
  return { label: "Ongoing", className: "bg-[#241B4D] text-[#B7ADFB]" };
}

function formatCountdown(target: string) {
  const diff = dayjs(target).diff(dayjs());
  if (diff <= 0) return null;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  return `${d}d ${h}h ${m}m`;
}

export default function ElectionSchedule() {
  const [election, setElection] = useState<Election>(defaultElection);
  const [, forceTick] = useState(0);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const [createForm] = Form.useForm<CreateElectionValues>();
  const [editForm] = Form.useForm<EditScheduleValues>();

  // re-render every minute so "Started/Ongoing/Ended" and the countdown stay accurate
  useEffect(() => {
    const id = setInterval(() => forceTick((n) => n + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const startStatus = getStartStatus(election.startsAt);
  const endStatus = getEndStatus(election.startsAt, election.endsAt);
  const countdown = formatCountdown(election.endsAt);

  const totalMs = dayjs(election.endsAt).diff(dayjs(election.startsAt));
  const elapsedMs = dayjs().diff(dayjs(election.startsAt));
  const progress = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));

  const handleCreateElection = async (values: CreateElectionValues) => {
    setCreating(true);
    try {
      // create election logic goes here
      // e.g. await api.post("/admin/elections", { title: values.title, startsAt: values.startsAt.toISOString(), endsAt: values.endsAt.toISOString() })
      setElection({
        title: values.title,
        startsAt: values.startsAt.toISOString(),
        endsAt: values.endsAt.toISOString(),
      });
      toast.success(`${values.title} created`);
      setCreateOpen(false);
      createForm.resetFields();
    } catch (error) {
      console.log(error);
      toast.error("Couldn't create the election. Try again.");
    } finally {
      setCreating(false);
    }
  };

  const handleEditSchedule = async (values: EditScheduleValues) => {
    setSaving(true);
    try {
      // update schedule logic goes here
      // e.g. await api.patch(`/admin/elections/${election.id}/schedule`, { startsAt: values.startsAt.toISOString(), endsAt: values.endsAt.toISOString() })
      setElection((prev) => ({
        ...prev,
        startsAt: values.startsAt.toISOString(),
        endsAt: values.endsAt.toISOString(),
      }));
      toast.success("Schedule updated");
      setEditOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Couldn't update the schedule. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#7C6AF4",
          colorBgContainer: "#1A1D2B",
          colorBgElevated: "#161925",
          colorBorder: "rgba(124,106,244,0.35)",
          colorText: "#E5E4EC",
          colorTextPlaceholder: "#5E5D74",
          borderRadius: 12,
        },
      }}
    >
      <Wrapper>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="mb-5 flex items-center gap-2">
            <svg
              className="h-5 w-5 text-[#B7ADFB] "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="4" y="7" width="16" height="14" rx="2" />
              <path d="M8 3v4M16 3v4M4 11h16" />
            </svg>
            <h2 className="text-lg font-bold text-white">Election Schedule</h2>
          </div>

          <div className="mb-5 flex flex-col gap-3 sm:flex-row">
            <AntButton
              type="primary"
              onClick={() => setCreateOpen(true)}
              style={{
                background: "#7C6AF4",
                borderColor: "#7C6AF4",
                fontWeight: 500,
                height: 35,
              }}
            >
              + Create Election
            </AntButton>
            <AntButton
              onClick={() => {
                editForm.setFieldsValue({
                  startsAt: dayjs(election.startsAt),
                  endsAt: dayjs(election.endsAt),
                });
                setEditOpen(true);
              }}
              style={{
                borderColor: "#7C6AF4",
                color: "#B7ADFB",
                background: "transparent",
                fontWeight: 500,
                height: 35,
              }}
            >
              Edit Schedule
            </AntButton>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-border bg-surface2 p-4">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7C6AF4]/20 text-[#B7ADFB]">
                  <FiPlay className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs tracking-wide text-slate-400 font-mono">
                    ELECTION STARTS
                  </p>
                  <p className="text-md text-white font-mono">
                    {dayjs(election.startsAt).format("MMM DD, YYYY · hh:mm A")}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs ${startStatus.className}`}
              >
                {startStatus.label}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border bg-surface2 p-4">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7C6AF4]/20 text-[#B7ADFB]">
                  <FiSquare className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs tracking-wide text-slate-400 font-mono">
                    ELECTION ENDS
                  </p>
                  <p className="text-md text-white font-mono">
                    {dayjs(election.endsAt).format("MMM DD, YYYY · hh:mm A")}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs border-slate-500 border font-semibold ${endStatus.className}`}
              >
                {endStatus.label}
              </span>
            </div>
          </div>

          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="h-full rounded-full bg-[#7C6AF4]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-slate-400">
            {countdown ? (
              <>
                Voting closes in{" "}
                <span className="font-semibold text-[#E8B563]">
                  {countdown}
                </span>
              </>
            ) : (
              "Voting has closed"
            )}
          </p>

          {/* Create election modal */}
          <Modal
            title="Create election"
            open={createOpen}
            onCancel={() => setCreateOpen(false)}
            footer={null}
            destroyOnHidden
            style={{ top: 20 }}
          >
            <Form
              form={createForm}
              layout="vertical"
              onFinish={handleCreateElection}
            >
              <Form.Item
                name="title"
                label="Election title"
                rules={[{ required: true, message: "Please enter a title" }]}
              >
                <Input placeholder="e.g. Faculty of Engineering Rep" />
              </Form.Item>
              <Form.Item label="Voting window" required>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Form.Item
                    name="startsAt"
                    noStyle
                    rules={[{ required: true, message: "Pick a start date" }]}
                  >
                    <DatePicker
                      showTime
                      className="w-full"
                      format="MMM DD, YYYY · hh:mm A"
                      placeholder="Start date & time"
                      classNames={{
                        popup: {
                          root: "custom-datepicker",
                        },
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="endsAt"
                    noStyle
                    rules={[{ required: true, message: "Pick an end date" }]}
                  >
                    <DatePicker
                      showTime
                      className="w-full"
                      format="MMM DD, YYYY · hh:mm A"
                      placeholder="End date & time"
                    />
                  </Form.Item>
                </div>
              </Form.Item>
              <AntButton
                type="primary"
                htmlType="submit"
                loading={creating}
                block
                style={{
                  background: "#7C6AF4",
                  borderColor: "#7C6AF4",
                  height: 44,
                  fontWeight: 700,
                }}
              >
                Create Election
              </AntButton>
            </Form>
          </Modal>

          {/* Edit schedule modal */}
          <Modal
            title={`Edit schedule — ${election.title}`}
            open={editOpen}
            onCancel={() => setEditOpen(false)}
            footer={null}
            destroyOnHidden
          >
            <Form
              form={editForm}
              layout="vertical"
              onFinish={handleEditSchedule}
            >
              <Form.Item label="Voting window" required>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Form.Item
                    name="startsAt"
                    noStyle
                    rules={[{ required: true, message: "Pick a start date" }]}
                  >
                    <DatePicker
                      showTime
                      className="w-full"
                      format="MMM DD, YYYY · hh:mm A"
                      placeholder="Start date & time"
                    />
                  </Form.Item>
                  <Form.Item
                    name="endsAt"
                    noStyle
                    rules={[{ required: true, message: "Pick an end date" }]}
                  >
                    <DatePicker
                      showTime
                      className="w-full"
                      format="MMM DD, YYYY · hh:mm A"
                      placeholder="End date & time"
                    />
                  </Form.Item>
                </div>
              </Form.Item>
              <AntButton
                type="primary"
                htmlType="submit"
                loading={saving}
                block
                style={{
                  background: "#7C6AF4",
                  borderColor: "#7C6AF4",
                  height: 44,
                  fontWeight: 700,
                }}
              >
                Save changes
              </AntButton>
            </Form>
          </Modal>
        </div>
      </Wrapper>
    </ConfigProvider>
  );
}
