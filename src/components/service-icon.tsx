import {
  Bandage,
  ClipboardCheck,
  ClipboardList,
  FileCheck,
  HeartPulse,
  School,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/data/services";

export const SERVICE_ICONS: Record<ServiceIcon, LucideIcon> = {
  stethoscope: Stethoscope,
  "heart-pulse": HeartPulse,
  "file-check": FileCheck,
  bandage: Bandage,
  "clipboard-list": ClipboardList,
  "clipboard-check": ClipboardCheck,
  school: School,
};
