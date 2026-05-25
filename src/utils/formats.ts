import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const DateFormat = {
  DD_MM_YYYY: "DD/MM/YYYY",
  YYYY_MM_DD: "YYYY-MM-DD",
  DD_MM_YYYY_HH_MM: "DD/MM/YYYY HH:mm",
  H_MM_A: "h:mm A",
  HH_MM_SS_A: "hh:mm:ss A",
  HH_MM: "HH:mm",
} as const;

export type DateFormat = (typeof DateFormat)[keyof typeof DateFormat];

export const formatDatetime = (
  date: string | Date | null | undefined,
  use12h?: boolean,
  format?: DateFormat,
): string => {
  if (!date) return "";
  const fmt = format || DateFormat.DD_MM_YYYY;
  return dayjs(date).format(fmt);
};
