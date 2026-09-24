export type ActivityItem = {
  id: string;
  message: string;
  stamp: string;
};

/** Labeled RECENT ACTIVITY — not live/real-time telemetry. */
export const activity: ActivityItem[] = [
  {
    id: "1",
    stamp: "2026-09-17",
    message: "[+] SC-200 verified",
  },
  {
    id: "2",
    stamp: "2026-09",
    message: "[+] SOC lab updated",
  },
  {
    id: "3",
    stamp: "2026-09",
    message: "[+] Security writeup published",
  },
  {
    id: "4",
    stamp: "2026-09",
    message: "[+] GitHub repository updated",
  },
  {
    id: "5",
    stamp: "2026-09",
    message: "[+] Detection research updated",
  },
];
