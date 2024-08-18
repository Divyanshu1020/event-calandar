# React Calendar Application Documentation

## Project Overview

This project was developed as an assignment for Grey Scientific Labs. The task was to build a calendar application that allows users to view, add, edit, and delete events. The application is designed to be intuitive, providing users with the ability to manage their schedules efficiently through a simple and user-friendly interface.

## Features

- **View Events:** Users can navigate through the calendar to view events.
- **Add Events:** Allows users to create new events by clicking on specific dates.
- **Edit Events:** Users can update the details of existing events.
- **Delete Events:** Users can remove events from the calendar.
- **Label Management:** Users can create, check, and uncheck labels to categorize events.
- **Persistent Storage:** Events and labels are saved using local storage, ensuring that data persists across sessions.

## Tech Stack

- **React & TypeScript:** Core framework and language used for building the application.
- **Tailwind CSS:** Provides the styling for the application, ensuring a responsive and modern design.
- **React Hooks:** 
  - **Context API:** For global state management.
  - **Reducer:** Handles complex state logic for managing events.
  - **Memo:** Optimizes performance by memoizing components.

## Usage Instructions

### Application Layout
- **Left Section (Sidebar):**
  - **Create Button:** Allows users to create new events.
  - **Small Calendar:** Users can navigate through months and select dates to create events.
  - **Label Section:** Users can create labels with specific colors and names. These labels can be checked or unchecked based on the user's preference.

- **Right Section (Main Calendar):**
  - **Big Calendar:** Displays the entire month where users can add events by clicking on specific dates.
  - **Event Creation:** Users can add a title, description, label color, and label name for each event. Events can also be deleted or updated.

### Event Management
- **Adding an Event:** Click on a date in either the small or big calendar, fill out the event details, and save.
- **Editing an Event:** Click on an existing event in the calendar to edit its details.
- **Deleting an Event:** Click on the event you want to delete and confirm the deletion.

## Code Examples

Here’s an example of how the event management system is implemented using React Context API, useReducer, and other hooks:

### `CalandarProvider.tsx`

```typescript
import dayjs, { Dayjs } from "dayjs";
import { ReactNode, useEffect, useMemo, useReducer, useState } from "react";
import { createCalandarContext } from "./context";

export type Event = {
  title: string;
  description: string;
  label: string;
  labelName: string;
  checkBoxColor: string;
  day: number;
  id: number;
};

export type Action =
  | { type: "push"; payload: Event }
  | { type: "update"; payload: Event }
  | { type: "delete"; payload: { id: number } };

function savedEventsReducer(state: Event[], action: Action): Event[] {
  switch (action.type) {
    case "push":
      return [...state, action.payload];
    case "update":
      return state.map((evt) =>
        evt.id === action.payload.id ? action.payload : evt
      );
    case "delete":
      return state.filter((evt) => evt.id !== action.payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

const CalandarProvider = ({ children }: { children: ReactNode }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalandarMonthIndex, setSmallCalandarMonthIndex] = useState<null | number>(null);
  const [smallCalandarDaySelected, setSmallCalandarDaySelected] = useState<Dayjs | null>(dayjs());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [labels, setLabels] = useState<
    { label: string; labelName: string; checkBoxColor: string; checked: boolean }[]
  >([]);

  const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels.filter((lbl) => lbl.checked).map((lbl) => lbl.labelName).includes(evt.labelName)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalandarMonthIndex !== null) {
      setMonthIndex(smallCalandarMonthIndex);
    }
  }, [smallCalandarMonthIndex]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents)].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.labelName === label.labelName);
        return {
          label: label.label,
          checkBoxColor: currentLabel ? currentLabel.checkBoxColor : label.checkBoxColor,
          labelName: currentLabel ? currentLabel.labelName : label.labelName,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  function updateLabel(label: { label: string; labelName: string; checkBoxColor: string; checked: boolean }) {
    setLabels(labels.map((lbl) => (lbl.labelName === label.labelName ? label : lbl)));
  }

  return (
    <createCalandarContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalandarMonthIndex,
        setSmallCalandarMonthIndex,
        smallCalandarDaySelected,
        setSmallCalandarDaySelected,
        showAddEvent,
        setShowAddEvent,
        dispatchCalEvent,
        savedEvents,
        selectedEvent,
        setSelectedEvent,
        labels,
        setLabels,
        updateLabel,
        filteredEvents,
      }}
    >
      {children}
    </createCalandarContext.Provider>
  );
};

export { CalandarProvider };
```

### `App.tsx`

```typescript
import { useEffect, useState } from 'react';
import { getMonth } from './utils/getMonth';
import Month from './components/Month';
import CalandarHeader from './components/CalandarHeader';
import { useCalandar } from './hooks/useCalandar';
import SideBar from './components/SideBar';

function App() {
  const [currentMonth, setMonthIndex] = useState(getMonth());
  const [showSideBar, setShowSideBar] = useState(false);
  const { monthIndex } = useCalandar();

  useEffect(() => {
    setMonthIndex(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <main>
      <div className="h-screen flex flex-col relative">
        <CalandarHeader setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
        <div className="flex flex-1">
          <SideBar showSideBar={showSideBar} />
          <Month month={currentMonth} />
        </div>
      </div>
    </main>
  );
}

export default App;
```

## Challenges and Solutions

### Challenge: State Management
Managing the state across different components, especially with complex operations like filtering and updating labels, was a challenge. This was solved by using React's `useReducer` and `useContext` hooks, which allowed for centralized and scalable state management.

### Solution: Optimizing Performance
To ensure the application remained performant as the number of events increased, `useMemo` was employed to memoize the filtered events, preventing unnecessary recalculations.

## Testing

Testing was conducted manually, focusing on the following areas:
- Event creation, editing, and deletion.
- Label creation and filtering.
- Navigation through the calendar.

Automated testing can be added in the future using tools like Jest and React Testing Library.

## Deployment

The application can be deployed on Vercel. Ensure that the environment is set to `production` and that all dependencies are properly installed before deploying.

## Contributing

Contributions are welcome! If you’d like to contribute to the project, feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Credits and Acknowledgements

- **React:** For providing the framework for building this application.
- **Tailwind CSS:** For the styling framework.
- **Day.js:** For handling date and time manipulation.

---
