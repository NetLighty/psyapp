import { create } from 'zustand'

interface Thought {
  id: string;
  title: string;
  description: string;
  date: Date;
  isPushed: boolean;
  createdAt: Date;
}

interface ThoughtsStore {
  thoughts: Thought[];
  pushedThoughtId: string | null;
  addThought: (title: string, description: string, date: Date) => void;
  editThought: (id: string, title: string, description: string, date: Date) => void;
  deleteThought: (id: string) => void;
  setPushedThought: (id: string | null) => void;
}

export const useThoughtsStore = create<ThoughtsStore>((set) => ({
  thoughts: [],
  pushedThoughtId: null,
  addThought: (title, description, date) => {
    const newThought: Thought = {
      id: Date.now().toString(),
      title,
      description,
      date,
      isPushed: false,
      createdAt: new Date(),
    };
    set((state) => ({ thoughts: [newThought, ...state.thoughts] }));
  },

  editThought: (id, title, description, date) => {
    set((state) => ({
      thoughts: state.thoughts.map((thought) =>
        thought.id === id ? { ...thought, title, description, date } : thought
      ),
    }));
  },

  deleteThought: (id) => {
    set((state) => ({
      thoughts: state.thoughts.filter((thought) => thought.id !== id),
      pushedThoughtId: state.pushedThoughtId === id ? null : state.pushedThoughtId,
    }));
  },

  setPushedThought: (id) => {
    set((state) => {
      if (state.pushedThoughtId === id) return state;
      const prevPushedId = state.pushedThoughtId;
      return {
        thoughts: state.thoughts.map((thought) => {
          if (thought.id === id) return { ...thought, isPushed: true };
          if (thought.id === prevPushedId) return { ...thought, isPushed: false };
          return thought;
        }),
        pushedThoughtId: id,
      };
    });
  },
}));