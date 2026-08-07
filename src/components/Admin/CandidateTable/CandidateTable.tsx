import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Modal,
  Form,
  Input,
  Select,
  Button as AntButton,
  ConfigProvider,
  theme,
} from "antd";

//React-Toastify
import { toast } from "react-toastify";

export interface CandidateTableRow {
  id: string;
  name: string;
  votes: number;
  voteShare: number; // 0 - 100
  position: string;
  emailVerified: boolean;
  actions?: string;
}

interface CandidatesTableProps {
  rows?: CandidateTableRow[];
}

const defaultRows: CandidateTableRow[] = [
  {
    id: "cj",
    name: "Chijioke",
    votes: 1093439,
    voteShare: 38.4,
    position: "SUG PRO",
    emailVerified: false,
    actions: "Manage",
  },
  {
    id: "fa",
    name: "F. Al-Rashid",
    votes: 903228,
    voteShare: 31.7,
    position: "Vice-President",
    emailVerified: true,
    actions: "Manage",
  },
  {
    id: "bo",
    name: "B. Oluwole",
    votes: 539027,
    voteShare: 18.9,
    position: "Secretary",
    emailVerified: false,
    actions: "Manage",
  },
  {
    id: "nk",
    name: "N. Kalu",
    votes: 313797,
    voteShare: 11.0,
    position: "President",
    emailVerified: true,
    actions: "Manage",
  },
];

function formatVotes(n: number) {
  return n.toLocaleString("en-US");
}

/* ------------------------------------------------------------------ */
/*  Position filter dropdown                                          */
/* ------------------------------------------------------------------ */

interface PositionFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

function PositionFilter({ value, onChange, options }: PositionFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label ?? "All positions";

  return (
    <div ref={containerRef} className="relative w-48">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg border border-border bg-black/20 py-1.5 pl-3 pr-3 text-sm text-slate-200 transition-colors hover:border-[#7C6AF4]/40 focus:border-[#7C6AF4]/60 focus:outline-none focus:ring-1 focus:ring-[#7C6AF4]/40"
      >
        <span className="truncate">{selectedLabel}</span>
        <svg
          className={`h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-lg border border-border bg-[#111319] py-1 shadow-lg">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                  isSelected
                    ? "bg-[#7C6AF4]/15 text-[#B7ACF9]"
                    : "text-slate-300 hover:bg-white/6"
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && (
                  <svg
                    className="h-3.5 w-3.5 shrink-0 text-[#7C6AF4]"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M4 10.5L8 14.5L16 6.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Manage modal — edit candidate + delete-with-typed-confirmation    */
/* ------------------------------------------------------------------ */

interface EditCandidateValues {
  name: string;
  position: string;
  emailVerified: boolean;
}

interface CandidateManageModalProps {
  candidate: CandidateTableRow | null;
  positionOptions: string[];
  onClose: () => void;
  onSave: (updated: CandidateTableRow) => Promise<void> | void;
  onDelete: (candidateId: string) => Promise<void> | void;
}

function CandidateManageModal({
  candidate,
  positionOptions,
  onClose,
  onSave,
  onDelete,
}: CandidateManageModalProps) {
  const [form] = Form.useForm<EditCandidateValues>();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteText, setDeleteText] = useState("");

  const open = !!candidate;
  const deleteMatches = candidate && deleteText.trim() === candidate.name;

  // `form` (from Form.useForm()) is created once here and is NOT tied to
  // the lifecycle of the <div key={candidate.id}> below — remounting that
  // div remounts the visual <Form>, but this `form` object is the actual
  // field store, and it survives untouched across that remount. So the
  // JSX resets, but the data behind it doesn't, unless we explicitly sync
  // it. This is a legitimate effect (pushing React state into an external
  // store — antd's form instance), not a setState call, so it doesn't
  // trigger the "setState in effect" warning the way setDeleteText did.
  useEffect(() => {
    if (candidate) {
      form.setFieldsValue({
        name: candidate.name,
        position: candidate.position,
        emailVerified: candidate.emailVerified,
      });
    }
  }, [candidate, form]);

  // `deleteText` IS plain React state, so it's reset via the key on the
  // wrapping div instead — remounting that subtree naturally reinitializes
  // its useState("") with no effect/setState needed for this part.
  const handleClose = () => {
    setDeleteText("");
    onClose();
  };

  const handleSave = async (values: EditCandidateValues) => {
    if (!candidate) return;
    setSaving(true);
    try {
      // update candidate logic goes here
      // e.g. await api.patch(`/admin/candidates/${candidate.id}`, values)
      await onSave({ ...candidate, ...values });
      toast.success(`${values.name} updated`);
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Couldn't save changes. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!candidate || !deleteMatches) return;
    setDeleting(true);
    try {
      // delete candidate logic goes here
      // e.g. await api.delete(`/admin/candidates/${candidate.id}`)
      await onDelete(candidate.id);
      toast.success(`${candidate.name} removed`);
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Couldn't delete candidate. Try again.");
    } finally {
      setDeleting(false);
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
      <Modal
        title={candidate ? `Manage — ${candidate.name}` : ""}
        open={open}
        onCancel={handleClose}
        footer={null}
        destroyOnHidden
        centered
        width="min(480px, 92vw)"
      >
        {candidate && (
          <div key={candidate.id}>
            {/* Read-only context — votes are a tallied result, not an
                admin-editable field, so they're shown here for reference
                but never sent as part of the save payload. */}
            <div className="mb-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-surface2 p-3">
                <p className="text-xs text-slate-400 font-mono">VOTES</p>
                <p className="text-lg font-bold text-white font-mono">
                  {formatVotes(candidate.votes)}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface2 p-3">
                <p className="text-xs text-slate-400 font-mono">VOTE SHARE</p>
                <p className="text-lg font-bold text-white font-mono">
                  {candidate.voteShare.toFixed(1)}%
                </p>
              </div>
            </div>

            <Form
              form={form}
              layout="vertical"
              initialValues={{
                name: candidate.name,
                position: candidate.position,
                emailVerified: candidate.emailVerified,
              }}
              onFinish={handleSave}
            >
              <Form.Item
                name="name"
                label="Candidate name"
                rules={[{ required: true, message: "Please enter a name" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="position"
                label="Position"
                rules={[
                  { required: true, message: "Please select a position" },
                ]}
              >
                <Select
                  placeholder="Select a position"
                  options={positionOptions.map((p) => ({ value: p, label: p }))}
                />
              </Form.Item>

              <Form.Item
                name="emailVerified"
                label="Email verification"
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { value: true, label: "Verified" },
                    { value: false, label: "Pending" },
                  ]}
                />
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

            <div className="mt-6 rounded-2xl border border-[#E24B4A]/30 bg-[#1D1113] p-4">
              <p className="text-sm font-bold text-[#F09595]">
                Delete this candidate
              </p>
              <p className="mt-1 mb-3 text-xs text-[#B08B8B]">
                This permanently removes {candidate.name} and their{" "}
                {formatVotes(candidate.votes)} votes from the result set. This
                cannot be undone.
              </p>
              <p className="mb-2 text-xs text-[#B08B8B]">
                Type{" "}
                <span className="font-mono font-semibold text-white">
                  {candidate.name}
                </span>{" "}
                to confirm.
              </p>
              <Input
                value={deleteText}
                onChange={(e) => setDeleteText(e.target.value)}
                placeholder={candidate.name}
                className="mb-3"
              />
              <AntButton
                danger
                type="primary"
                block
                disabled={!deleteMatches}
                loading={deleting}
                onClick={handleDelete}
                style={{ height: 42, fontWeight: 700 }}
              >
                Delete Candidate
              </AntButton>
            </div>
          </div>
        )}
      </Modal>
    </ConfigProvider>
  );
}

/* ------------------------------------------------------------------ */
/*  Candidate table                                                    */
/* ------------------------------------------------------------------ */

const columnHelper = createColumnHelper<CandidateTableRow>();

export default memo(function CandidateTable({
  rows = defaultRows,
}: CandidatesTableProps) {
  // Table's own copy of the data, seeded from the prop. Manage/save/delete
  // update this directly so the table re-renders immediately; swap the
  // setData calls inside handleSaveCandidate/handleDeleteCandidate for
  // your real mutation + refetch once this is wired to the backend.
  const [data, setData] = useState<CandidateTableRow[]>(rows);

  const [managingCandidate, setManagingCandidate] =
    useState<CandidateTableRow | null>(null);

  // Immediate values — drive what's shown in the input/select, always instant.
  const [searchInput, setSearchInput] = useState("");
  const [positionInput, setPositionInput] = useState<string>("all");

  const [searchText, setSearchText] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<string>("all");

  const [isPending, startTransition] = useTransition();

  function handleSearchChange(value: string) {
    setSearchInput(value);
    startTransition(() => setSearchText(value));
  }

  function handlePositionChange(value: string) {
    setPositionInput(value);
    startTransition(() => setSelectedPosition(value));
  }

  function handleSaveCandidate(updated: CandidateTableRow) {
    setData((prev) =>
      prev.map((row) => (row.id === updated.id ? updated : row)),
    );
  }

  function handleDeleteCandidate(candidateId: string) {
    setData((prev) => prev.filter((row) => row.id !== candidateId));
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Candidate",
        filterFn: "includesString",
        cell: (info) => (
          <div className="flex items-center gap-2.5 font-mono">
            <span className="text-xs text-slate-100">{info.getValue()}</span>
          </div>
        ),
      }),
      columnHelper.accessor("position", {
        header: "Position",
        filterFn: "equalsString",
        cell: (info) => (
          <span className="text-xs text-slate-400 font-mono">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("votes", {
        header: "Votes",
        cell: (info) => (
          <span className="text-xs font-mono text-slate-300">
            {formatVotes(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor("voteShare", {
        header: "Vote Share",
        cell: (info) => (
          <span className="text-xs text-slate-400 font-mono">
            {info.getValue().toFixed(1)}%
          </span>
        ),
      }),
      columnHelper.accessor("emailVerified", {
        header: "emailVerified ",
        cell: (info) =>
          info.getValue() ? (
            <span className="text-xs text-green font-mono bg-[#152926] rounded-2xl py-1 px-5 border border-[#22c55e33]">
              Verified
            </span>
          ) : (
            <span className="text-xs text-[#D99A23] font-mono  rounded-2xl py-1 px-5 border border-[#f4a62333] bg-[#2B2620]">
              Pending
            </span>
          ),
      }),
      columnHelper.accessor("actions", {
        header: "Actions",
        cell: (info) => (
          <span
            className="text-xs font-mono text-purple cursor-pointer hover:text-purple"
            onClick={() => setManagingCandidate(info.row.original)}
          >
            {info.getValue()}
          </span>
        ),
      }),
    ],
    [],
  );

  const positionOptions = useMemo(() => {
    const unique = Array.from(new Set(data.map((r) => r.position)));
    return [
      { label: "All positions", value: "all" },
      ...unique.map((p) => ({ label: p, value: p })),
    ];
  }, [data]);

  // Plain string list (no "All positions") — this is what the Manage
  // modal's Position <Select> offers, since "All" only makes sense as a
  // table filter, not as something a candidate can actually run for.
  const uniquePositions = useMemo(
    () => Array.from(new Set(data.map((r) => r.position))),
    [data],
  );

  const columnFilters: ColumnFiltersState = useMemo(() => {
    const filters: ColumnFiltersState = [];
    if (searchText) filters.push({ id: "name", value: searchText });
    if (selectedPosition !== "all")
      filters.push({ id: "position", value: selectedPosition });
    return filters;
  }, [searchText, selectedPosition]);

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full h-full rounded-2xl border border-border bg-surface p-5 shadow-lg">
      <h2 className="font-bold text-white">Registered Candidates</h2>
      <p className="mb-4 text-slate-400">
        {" "}
        Manage all registered candidates participating in the election.
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-45">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="M14 14L18 18" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search candidate..."
            className="w-full rounded-lg border border-border bg-black/20 py-1.5 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-500 transition-colors focus:border-[#7C6AF4]/60 focus:outline-none focus:ring-1 focus:ring-[#7C6AF4]/40"
          />
        </div>

        <PositionFilter
          value={positionInput}
          onChange={handlePositionChange}
          options={positionOptions}
        />

        {isPending && <span className="text-xs text-slate-500">Updating…</span>}
      </div>

      <div
        className={`overflow-y-auto max-h-dvh rounded-lg border border-border/60 transition-opacity ${
          isPending ? "opacity-60" : "opacity-100"
        }`}
      >
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-[#0F1116]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-border text-[10px] uppercase tracking-wider text-slate-500"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 font-medium text-xs">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-sm text-slate-500"
                >
                  No candidates match your filters.
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-border/60 last:border-0 transition-colors hover:bg-white/6 ${
                  index % 2 === 0 ? "bg-white/3" : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CandidateManageModal
        candidate={managingCandidate}
        positionOptions={uniquePositions}
        onClose={() => setManagingCandidate(null)}
        onSave={handleSaveCandidate}
        onDelete={handleDeleteCandidate}
      />
    </div>
  );
});
