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

const columnHelper = createColumnHelper<CandidateTableRow>();

const columns = [
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
        onClick={() => {
          console.log(info.row.original);
        }}
      >
        {info.getValue()}
      </span>
    ),
  }),
];

export default memo(function CandidateTable({
  rows = defaultRows,
}: CandidatesTableProps) {
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

  const positionOptions = useMemo(() => {
    const unique = Array.from(new Set(rows.map((r) => r.position)));
    return [
      { label: "All positions", value: "all" },
      ...unique.map((p) => ({ label: p, value: p })),
    ];
  }, [rows]);

  const columnFilters: ColumnFiltersState = useMemo(() => {
    const filters: ColumnFiltersState = [];
    if (searchText) filters.push({ id: "name", value: searchText });
    if (selectedPosition !== "all")
      filters.push({ id: "position", value: selectedPosition });
    return filters;
  }, [searchText, selectedPosition]);

  const table = useReactTable({
    data: rows,
    columns,
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full h-full rounded-2xl border border-border bg-surface p-5 shadow-lg">
      <h2 className="font-bold text-white">Candidate Result</h2>
      <p className="mb-4 text-slate-400">
        {" "}
        Detailed election results for all candidates
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
    </div>
  );
});
