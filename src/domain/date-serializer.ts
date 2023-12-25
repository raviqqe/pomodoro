import { format, parse } from "date-fns";

const DATE_FORMAT = "yyyyMMdd";

export class DateSerializer {
  public static serialize(date: Date): string {
    return format(date, DATE_FORMAT);
  }

  public static deserialize(formattedString: string): Date {
    return parse(formattedString, DATE_FORMAT, new Date());
  }
}
