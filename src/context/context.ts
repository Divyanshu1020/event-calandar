import { Dayjs } from "dayjs";
import { createContext } from "react";
import { Action, Event } from "./calandar";

// Define the shape of your context
interface CalandarContextProps {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  smallCalandarMonthIndex: number | null;
  setSmallCalandarMonthIndex: (index: number) => void;
  smallCalandarDaySelected: Dayjs | null;
  setSmallCalandarDaySelected: (day: Dayjs) => void;
  showAddEvent: boolean;
  setShowAddEvent: (value: boolean) => void;
  dispatchCalEvent: (action: Action) => void;
  savedEvents: Event[];
  selectedEvent: Event | null;
  setSelectedEvent: (val: Event | null) => void;
  labels: { label: string; labelName: string; checkBoxColor: string; checked: boolean }[];
  setLabels: (value: { label: string; labelName: string; checkBoxColor: string; checked: boolean }[]) => void;
  updateLabel: (value: { label: string; labelName: string; checkBoxColor: string; checked: boolean }) => void;
  filteredEvents: Event[];
}

// Create context with default values
export const createCalandarContext = createContext<CalandarContextProps>({
  monthIndex: 0,
  setMonthIndex: () => {},
  smallCalandarMonthIndex: null,
  setSmallCalandarMonthIndex: () => {},
  smallCalandarDaySelected: null,
  setSmallCalandarDaySelected: () => {},
  showAddEvent: false,
  setShowAddEvent: () => {},
  dispatchCalEvent: () => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  labels: [],
  setLabels: () => {},
  updateLabel: () => {},
  filteredEvents: [],
});
