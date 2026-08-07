import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button as AntButton,
  ConfigProvider,
  theme,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { FiPlay, FiSquare, FiCalendar, FiClock } from "react-icons/fi";

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
  startDate: Dayjs;
  startTime: Dayjs;
  endDate: Dayjs;
  endTime: Dayjs;
}

interface EditScheduleValues {
  startDate: Dayjs;
  startTime: Dayjs;
  endDate: Dayjs;
  endTime: Dayjs;
}

const defaultElection: Election = {
  title: "SUG Election 2026",
  startsAt: dayjs().subtract(1, "day").toISOString(),
  endsAt: dayjs().add(2, "day").add(14, "hour").toISOString(),
};

// combine a date-only Dayjs and a time-only Dayjs into one Dayjs instant
function combineDateAndTime(date: Dayjs, time: Dayjs): Dayjs {
  return date.hour(time.hour()).minute(time.minute()).second(0).millisecond(0);
}

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

// One "date + time" field pair, styled as a small card. Used for both the
// start and end sides of the voting window in both modals.
//
// `placement="bottomLeft"` sets the preferred direction, but antd still
// auto-flips to whichever side has more room — that's normally correct
// behavior (it's what stops the panel from clipping when a field sits
// near an edge), so it's left enabled rather than forced off. The actual
// safety net for short browser windows, where NEITHER direction has full
// room, is the max-height + overflow-y:auto on `.custom-datepicker` in
// the <style> block below — the panel scrolls internally instead of
// running off-screen, regardless of which side it opened on.
function DateTimeGroup({
  icon,
  label,
  dateName,
  timeName,
}: {
  icon: React.ReactNode;
  label: string;
  dateName: string;
  timeName: string;
}) {
  return (
    <div className="flex-1 rounded-2xl border border-border bg-surface2 p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C6AF4]/20 text-[#B7ADFB]">
          {icon}
        </span>
        <p className="text-sm font-semibold text-white">{label}</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Form.Item
          name={dateName}
          noStyle
          rules={[{ required: true, message: "Pick a date" }]}
        >
          <DatePicker
            className="w-full"
            format="MMM DD, YYYY"
            placeholder="Date"
            suffixIcon={<FiCalendar className="text-[#8B8AA3]" />}
            getPopupContainer={() => document.body}
            placement="bottomLeft"
            classNames={{ popup: { root: "custom-datepicker" } }}
          />
        </Form.Item>
        <Form.Item
          name={timeName}
          noStyle
          rules={[{ required: true, message: "Pick a time" }]}
        >
          <TimePicker
            className="w-full"
            use12Hours
            format="hh:mm A"
            placeholder="Time"
            suffixIcon={<FiClock className="text-[#8B8AA3]" />}
            getPopupContainer={() => document.body}
            placement="bottomLeft"
            classNames={{ popup: { root: "custom-datepicker" } }}
          />
        </Form.Item>
      </div>
    </div>
  );
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
      const startsAt = combineDateAndTime(values.startDate, values.startTime);
      const endsAt = combineDateAndTime(values.endDate, values.endTime);

      if (!endsAt.isAfter(startsAt)) {
        toast.error("End date must be after the start date");
        return;
      }

      // create election logic goes here
      // e.g. await api.post("/admin/elections", { title: values.title, startsAt: startsAt.toISOString(), endsAt: endsAt.toISOString() })
      setElection({
        title: values.title,
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
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
      const startsAt = combineDateAndTime(values.startDate, values.startTime);
      const endsAt = combineDateAndTime(values.endDate, values.endTime);

      if (!endsAt.isAfter(startsAt)) {
        toast.error("End date must be after the start date");
        return;
      }

      // update schedule logic goes here
      // e.g. await api.patch(`/admin/elections/${election.id}/schedule`, { startsAt: startsAt.toISOString(), endsAt: endsAt.toISOString() })
      setElection((prev) => ({
        ...prev,
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
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
      {/* Makes the date/time popup stack vertically and stay within the
          viewport on small screens, instead of overflowing sideways.
          Also recolors antd's default-blue "today"/"now"/selected states
          to the brand purple. */}
      <style>{`
        .custom-datepicker {
          max-width: calc(100vw - 24px);
          max-height: 80vh;
          overflow-y: auto;
        }
        .custom-datepicker .ant-picker-today-btn {
          color: #B7ADFB;
        }
        .custom-datepicker .ant-picker-today-btn:hover {
          color: #7C6AF4;
        }
        .custom-datepicker .ant-picker-cell-today .ant-picker-cell-inner::before {
          border-color: #7C6AF4 !important;
        }
        .custom-datepicker .ant-picker-cell-selected .ant-picker-cell-inner,
        .custom-datepicker .ant-picker-cell-range-start .ant-picker-cell-inner,
        .custom-datepicker .ant-picker-cell-range-end .ant-picker-cell-inner {
          background: #7C6AF4 !important;
        }
        .custom-datepicker .ant-picker-cell-in-view.ant-picker-cell-in-range::before {
          background: rgba(124, 106, 244, 0.15);
        }
        .custom-datepicker .ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner {
          background: rgba(124, 106, 244, 0.25) !important;
          color: #F4F3FF !important;
        }
        .custom-datepicker .ant-picker-now-btn {
          color: #B7ADFB;
        }
        .custom-datepicker .ant-picker-now-btn:hover {
          color: #7C6AF4;
        }
        .custom-datepicker .ant-picker-footer {
          position: sticky;
          bottom: 0;
          background: #161925;
          z-index: 1;
        }
        @media (max-width: 480px) {
          .custom-datepicker .ant-picker-datetime-panel {
            flex-direction: column;
          }
          .custom-datepicker .ant-picker-time-panel {
            max-width: 100%;
            border-left: none;
            border-top: 1px solid rgba(124, 106, 244, 0.15);
          }
          .custom-datepicker .ant-picker-panel-container {
            max-width: 100%;
            overflow-x: hidden;
          }
        }
      `}</style>

      <Wrapper>
        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
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
              block
              className="sm:w-auto!"
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
                  startDate: dayjs(election.startsAt),
                  startTime: dayjs(election.startsAt),
                  endDate: dayjs(election.endsAt),
                  endTime: dayjs(election.endsAt),
                });
                setEditOpen(true);
              }}
              block
              className="sm:w-auto!"
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
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#7C6AF4]/20 text-[#B7ADFB]">
                  <FiPlay className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs tracking-wide text-slate-400 font-mono">
                    ELECTION STARTS
                  </p>
                  <p className="text-md text-white font-mono wrap-break-word">
                    {dayjs(election.startsAt).format("MMM DD, YYYY · hh:mm A")}
                  </p>
                </div>
              </div>
              <span
                className={`w-fit rounded-full px-3 py-1 text-xs ${startStatus.className}`}
              >
                {startStatus.label}
              </span>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#7C6AF4]/20 text-[#B7ADFB]">
                  <FiSquare className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs tracking-wide text-slate-400 font-mono">
                    ELECTION ENDS
                  </p>
                  <p className="text-md text-white font-mono wrap-break-word">
                    {dayjs(election.endsAt).format("MMM DD, YYYY · hh:mm A")}
                  </p>
                </div>
              </div>
              <span
                className={`w-fit rounded-full px-3 py-1 text-xs border-slate-500 border font-semibold ${endStatus.className}`}
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
            centered
            width="min(480px, 92vw)"
            style={{ top: 48 }}
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

              <p className="mb-2 text-sm font-medium text-white">
                Voting window <span className="text-[#E24B4A]">*</span>
              </p>
              <div className="mb-4 flex flex-col gap-3 sm:flex-row">
                <DateTimeGroup
                  icon={<FiPlay className="h-3.5 w-3.5" />}
                  label="Starts"
                  dateName="startDate"
                  timeName="startTime"
                />
                <DateTimeGroup
                  icon={<FiSquare className="h-3.5 w-3.5" />}
                  label="Ends"
                  dateName="endDate"
                  timeName="endTime"
                />
              </div>

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
            centered
            width="min(480px, 92vw)"
            style={{ top: 48 }}
            // styles={{
            //   body: {
            //     maxHeight: "70vh",
            //     overflowY: "auto",
            //     background:"red",
            //     position: "relative"
            //   },
            // }}
          >
            <Form
              form={editForm}
              layout="vertical"
              onFinish={handleEditSchedule}
            >
              <p className="mb-2 text-sm font-medium text-white">
                Voting window <span className="text-[#E24B4A]">*</span>
              </p>
              <div className="mb-4 flex flex-col gap-3 sm:flex-row">
                <DateTimeGroup
                  icon={<FiPlay className="h-3.5 w-3.5" />}
                  label="Starts"
                  dateName="startDate"
                  timeName="startTime"
                />
                <DateTimeGroup
                  icon={<FiSquare className="h-3.5 w-3.5" />}
                  label="Ends"
                  dateName="endDate"
                  timeName="endTime"
                />
              </div>

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
