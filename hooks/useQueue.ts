import { create } from "zustand";

type State = {
  queue: string[];
};

type Actions = {
  add: (item: any) => void;
  remove: () => void;
  deleteQueue: () => void;
};

type Action = {
  type: keyof Actions;
  payload?: any;
};

const queueReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "add":
      const updatedQueueAdd = [...state.queue, action.payload];
      localStorage.setItem("queue", JSON.stringify(updatedQueueAdd));
      return {
        queue: updatedQueueAdd,
      };
    case "remove":
      const updatedQueueRemove = state.queue.slice(1);
      localStorage.setItem("queue", JSON.stringify(updatedQueueRemove));
      return {
        queue: updatedQueueRemove,
      };
    case "deleteQueue":
      localStorage.removeItem("queue");
      return {
        queue: [],
      };
    default:
      return state;
  }
};

export const useQueue = create<State & Actions>((set) => {
  const initialQueue = JSON.parse(localStorage.getItem("queue") || "[]");

  return {
    queue: initialQueue,
    add: (item: any) => {
      set((state) => queueReducer(state, { type: "add", payload: item }));
    },
    remove: () => {
      set((state) => queueReducer(state, { type: "remove" }));
    },
    deleteQueue: () => {
      set((state) => queueReducer(state, { type: "deleteQueue" }));
    },
  };
});
