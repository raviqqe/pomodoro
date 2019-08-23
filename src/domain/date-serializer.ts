import { DateTime } from "luxon";

const DATE_FORMAT: string = "yyyyMMdd";

export class DateSerializer {
  public static serialize(date: Date): string {
    return DateTime.fromJSDate(date)
      .toLocal()
      .toFormat(DATE_FORMAT);
  }

  public static deserialize(formattedString: string): Date {
    return DateTime.fromFormat(formattedString, DATE_FORMAT).toJSDate();
  }
}
