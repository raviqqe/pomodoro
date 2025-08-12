import { format, parse } from "date-fns";

const DATE_FORMAT = "yyyyMMdd";

export const serializeDate = (date: Date): string => format(date, DATE_FORMAT);

export const deserializeDate = (formattedString: string): Date =>
  parse(formattedString, DATE_FORMAT, new Date());
