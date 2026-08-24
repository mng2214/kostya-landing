import {
  Wrench,
  Flame,
  Wind,
  WashingMachine,
  Zap,
  Droplets,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  wrench: Wrench,
  flame: Flame,
  wind: Wind,
  "washing-machine": WashingMachine,
  zap: Zap,
  droplets: Droplets,
};

export function ServiceIcon({
  name,
  className = "size-6",
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? Wrench;
  return <Cmp className={className} aria-hidden="true" />;
}
