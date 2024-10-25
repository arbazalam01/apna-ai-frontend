import { atom } from "jotai";

// Atom for start date

// Atom for end date
const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

export const endDateAtom = atom(new Date());
export const startDateAtom = atom(sixMonthsAgo);

// Optional: Derived atom to get the date range
export const dateRangeAtom = atom(
  (get) => ({
    start: get(startDateAtom),
    end: get(endDateAtom),
  }),
  (get, set, update) => {
    set(startDateAtom, update.start);
    set(endDateAtom, update.end);
  }
);
