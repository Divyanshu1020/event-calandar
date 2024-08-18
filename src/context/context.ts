import { Dayjs } from "dayjs";
import { createContext } from "react";
import { Action, Event } from "./calandar";

export const createCalandarContext = createContext({
  monthIndex: 0,
  setMonthIndex: (index: number) => {},
  smallCalandarMonthIndex: null as number | null,
  setSmallCalandarMonthIndex: (index: number) => {},
  smallCalandarDaySelected: null as Dayjs | null,
  setSmallCalandarDaySelected: (day: Dayjs) => {},
  showAddEvent: false,
  setShowAddEvent: (value: boolean) => {},
  dispatchCalEvent: (action: Action) => {},
  savedEvents: [] as Event[],
  selectedEvent: null as Event | null,
  setSelectedEvent: (val:Event | null) => {},
  setLabels: ( value: { label: string; labelName: string; checkBoxColor: string; checked: boolean }[]) => {},
  labels: [] as { label: string; labelName: string; checkBoxColor: string; checked: boolean }[] | [],
  updateLabel: (value : { label: string; labelName: string; checkBoxColor: string; checked: boolean }) => {},
  filteredEvents: [] as Event[] | [],
});
