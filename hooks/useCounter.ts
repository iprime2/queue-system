import { create } from "zustand";

type State = {
  counters: string[];
};

type Actions = {
  add: (item: any) => void;
  remove: () => void;
  deleteCounters: () => void;
};

type Action = {
  type: keyof Actions;
  payload?: any;
};

const countersReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "add":
      const updatedCountersAdd = [...state.counters, action.payload];
      localStorage.setItem("counters", JSON.stringify(updatedCountersAdd));
      return {
        counters: updatedCountersAdd,
      };
    case "remove":
      const updatedCountersRemove = state.counters.slice(1);
      localStorage.setItem("counters", JSON.stringify(updatedCountersRemove));
      return {
        counters: updatedCountersRemove,
      };
    case "deleteCounters":
      localStorage.removeItem("counters");
      return {
        counters: [],
      };
    default:
      return state;
  }
};

export const useCounters = create<State & Actions>((set) => {
  const initialCounters =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("counters") || "[]")
      : [];

  return {
    counters: initialCounters,
    add: (item: any) => {
      set((state) => countersReducer(state, { type: "add", payload: item }));
    },
    remove: () => {
      set((state) => countersReducer(state, { type: "remove" }));
    },
    deleteCounters: () => {
      set((state) => countersReducer(state, { type: "deleteCounters" }));
    },
  };
});
