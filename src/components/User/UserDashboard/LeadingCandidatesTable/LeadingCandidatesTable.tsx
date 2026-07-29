import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
  type ColumnFiltersState,
} from "@tanstack/react-table";

export interface LeadingCandidateTableRow {
  id: string;
  name: string;
  votes: number;
  voteShare: number; // 0 - 100
  position: string;
  color: string;
}

interface LeadingCandidatesTableProps {
  rows?: LeadingCandidateTableRow[];
}

const defaultRows: LeadingCandidateTableRow[] = [
  {
    id: "cj",
    name: "Chijioke",
    votes: 1093439,
    voteShare: 38.4,
    position: "SUG PRO",
    color: "#7C6AF4",
  },
  {
    id: "fa",
    name: "F. Al-Rashid",
    votes: 903228,
    voteShare: 31.7,
    position: "Vice-President",
    color: "#2DD4BF",
  },
  {
    id: "bo",
    name: "B. Oluwole",
    votes: 539027,
    voteShare: 18.9,
    position: "Secretary",
    color: "#F59E0B",
  },
  {
    id: "nk",
    name: "N. Kalu",
    votes: 313797,
    voteShare: 11.0,
    position: "President",
    color: "#EC4899",
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

const columnHelper = createColumnHelper<LeadingCandidateTableRow>();

const columns = [
  columnHelper.accessor("name", {
    header: "Candidate",
    filterFn: "includesString",
    cell: (info) => (
      <div className="flex items-center gap-2.5">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: info.row.original.color }}
        />
        <span className="text-sm text-slate-100">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor("position", {
    header: "Position",
    filterFn: "equalsString",
    cell: (info) => (
      <span className="text-sm text-slate-400">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("votes", {
    header: "Votes",
    cell: (info) => (
      <span className="font-mono text-sm text-slate-300">
        {formatVotes(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor("voteShare", {
    header: "Vote Share",
    cell: (info) => (
      <span
        className="text-sm font-semibold"
        style={{ color: info.row.original.color }}
      >
        {info.getValue().toFixed(1)}%
      </span>
    ),
  }),
  columnHelper.display({
    id: "status",
    header: "Status",
    cell: () => (
      <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
        Leading
      </span>
    ),
  }),
];

export default memo(function LeadingCandidatesTable({
  rows = defaultRows,
}: LeadingCandidatesTableProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<string>("all");

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
      <h2 className="font-bold text-white">Candidate Results</h2>
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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search candidate..."
            className="w-full rounded-lg border border-border bg-black/20 py-1.5 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-500 transition-colors focus:border-[#7C6AF4]/60 focus:outline-none focus:ring-1 focus:ring-[#7C6AF4]/40"
          />
        </div>

        <PositionFilter
          value={selectedPosition}
          onChange={setSelectedPosition}
          options={positionOptions}
        />
      </div>

      <div className="overflow-y-auto max-h-dvh rounded-lg border border-border/60">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-[#0F1116]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-border text-xs uppercase tracking-wider text-slate-500"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 text-xs lg:text-xs">
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
                className={`border-b border-border/60 last:border-0 transition-colors hover:bg-white/[0.06] ${
                  index % 2 === 0 ? "bg-white/[0.03]" : ""
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
