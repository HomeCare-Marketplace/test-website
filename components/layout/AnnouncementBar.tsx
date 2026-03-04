import { announcementText } from "@/data/navigation";

export function AnnouncementBar() {
  return (
    <div className="bg-ink py-2 text-center text-[11px] font-medium tracking-[0.05em] text-white/90 motion-safe:animate-slide-down">
      <p>{announcementText}</p>
    </div>
  );
}
