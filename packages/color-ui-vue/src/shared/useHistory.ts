import { computed, ref } from "vue";
import { LOCAL_KEY } from "@/constant/localStorageKey";
import { useFormatColor } from "@/shared/useConvertColor";
import { useStorage } from "@vueuse/core";

const HISTORY_LIMIT = 8;

type HistoryItem = {
  color: number[];
  alpha: number;
};

const actionTypes = {
  ADD_HISTORY: "ADD_HISTORY",
  REMOVE_HISTORY: "REMOVE_HISTORY",
  CLEAR_HISTORY: "CLEAR_HISTORY",
  INIT_HISTORY: "INIT_HISTORY"
} as const;

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_HISTORY"];
      history: HistoryItem;
    }
  | {
      type: ActionType["REMOVE_HISTORY"];
      history: HistoryItem;
    }
  | {
      type: ActionType["CLEAR_HISTORY"];
    }
  | {
      type: ActionType["INIT_HISTORY"];
    };

interface State {
  histories: HistoryItem[];
}

const defaultPalette: HistoryItem[] = [
  { color: [252, 192, 46], alpha: 1 },
  { color: [246, 124, 1], alpha: 1 },
  { color: [230, 74, 25], alpha: 1 },
  { color: [216, 27, 67], alpha: 1 },
  { color: [142, 36, 170], alpha: 1 },
  { color: [81, 45, 167], alpha: 1 },
  { color: [31, 135, 232], alpha: 1 },
  { color: [0, 135, 129], alpha: 1 },
  { color: [5, 160, 69], alpha: 1 }
];

const state = ref<State>({
  histories: []
});

const localHistory = useStorage(
  LOCAL_KEY,
  {
    histories: defaultPalette
  },
  localStorage,
  { mergeDefaults: true }
);

type DispatchOptions = {
  limit: number;
  enabledLocalStorage: boolean;
  defaultHistory: HistoryItem[];
};

const formatColor = (color: number[], alpha: number) => {
  return useFormatColor({ r: color[0], g: color[1], b: color[2], a: alpha }, "rgba", "hexa");
};

const removeDuplicateHistory = (histories: HistoryItem[], colorToFind: string | null) => {
  const duplicatedIndex = histories.findIndex((h) => {
    const color = formatColor(h.color, h.alpha);
    return color === colorToFind;
  });
  if (duplicatedIndex !== -1) {
    histories.splice(duplicatedIndex, 1);
  }
  return histories;
};

const addHistory = (history: HistoryItem, limit: number) => {
  const colorToFind = formatColor(history.color, history.alpha);
  let newHistory = [...state.value.histories];
  newHistory = removeDuplicateHistory(newHistory, colorToFind);
  state.value.histories = [history, ...newHistory].slice(0, limit);
};

const updateLocalHistory = (
  histories: HistoryItem[],
  enabledLocalStorage: boolean,
  limit: number
) => {
  if (enabledLocalStorage) {
    localHistory.value.histories = histories.slice(0, limit);
  }
};

const initializeHistory = (
  defaultHistory: HistoryItem[],
  enabledLocalStorage: boolean,
  limit: number
) => {
  if (enabledLocalStorage) {
    const data = localHistory.value.histories;
    localHistory.value.histories = data.slice(0, limit);
    state.value.histories = localHistory.value.histories;
  } else {
    state.value.histories = defaultHistory.slice(0, limit);
  }
};

function dispatch(action: Action, options?: Partial<DispatchOptions>) {
  const defaultOptions: DispatchOptions = {
    limit: HISTORY_LIMIT,
    enabledLocalStorage: true,
    defaultHistory: defaultPalette
  };

  const opts = { ...defaultOptions, ...options };
  const { limit, enabledLocalStorage, defaultHistory } = opts;

  switch (action.type) {
    case actionTypes.ADD_HISTORY:
      addHistory(action.history, limit);
      if (enabledLocalStorage) {
        localHistory.value.histories = state.value.histories;
      }
      break;

    case actionTypes.REMOVE_HISTORY:
      state.value.histories = removeDuplicateHistory(
        state.value.histories,
        formatColor(action.history.color, action.history.alpha)
      );
      if (enabledLocalStorage) {
        localHistory.value.histories = state.value.histories;
      }
      break;

    case actionTypes.CLEAR_HISTORY:
      state.value.histories = [];
      updateLocalHistory([], enabledLocalStorage, limit);
      break;

    case actionTypes.INIT_HISTORY:
      initializeHistory(defaultHistory, enabledLocalStorage, limit);
      break;
  }
}

function useHistory(options?: Partial<DispatchOptions>) {
  function history() {
    const init = () => dispatch({ type: actionTypes.INIT_HISTORY }, options);
    const remove = (props: HistoryItem) =>
      dispatch({ type: actionTypes.REMOVE_HISTORY, history: props }, options);
    const clear = () => dispatch({ type: actionTypes.CLEAR_HISTORY }, options);
    const create = (props: HistoryItem) =>
      dispatch({ type: actionTypes.ADD_HISTORY, history: props }, options);

    return {
      remove,
      create,
      clear,
      init
    };
  }

  return {
    histories: computed(() => state.value.histories),
    history
  };
}

export { useHistory, type HistoryItem };
