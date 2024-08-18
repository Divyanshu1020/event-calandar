import dayjs, { Dayjs } from "dayjs";

export function getMonth(month: number = dayjs().month()): Dayjs[][] {
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;

    const daysArray: Dayjs[][] = Array.from({ length: 5 }, (): Dayjs[] => []).map((): Dayjs[] => {
        return Array.from({ length: 7 }, (): Dayjs | null => null).map((): Dayjs => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        });
    });

    return daysArray;
}
