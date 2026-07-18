import { GiCheckMark } from "react-icons/gi";

export interface SecurityStatusItem {
  id: string;
  label: string;
  value: string;
  verified?: boolean;
}

interface SecurityStatusProps {
  items?: SecurityStatusItem[];
}

const defaultItems: SecurityStatusItem[] = [
  { id: "encryption", label: "Encryption", value: "AES-256", verified: true },
  { id: "audit-log", label: "Audit log", value: "Active", verified: true },
  { id: "session", label: "Session", value: "Verified", verified: true },
];

export default function SecurityStatus({
  items = defaultItems,
}: SecurityStatusProps) {
  return (
    <div className="w-full rounded-md border border-border bg-surface p-6 shadow-lg">
      <h2 className="mb-5 text-xs font-semibold tracking-widest">
        SECURITY STATUS
      </h2>

      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between">
            <span className="text-sm text-slate-400">{item.label}</span>
            <span className="flex items-center gap-1.5 font-mono text-sm font-semibold text-emerald-400">
              {item.value}
              {item.verified && <GiCheckMark className="h-3.5 w-3.5" />}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
