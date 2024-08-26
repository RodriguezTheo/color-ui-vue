import { computed, ref } from "vue";
import { useFormatColor } from "@/shared/useConvertColor";

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

type DispatchOptions = {
  limit: number;
  defaultHistory: HistoryItem[];
  allowedAlpha: boolean;
};

const formatColor = (color: number[], alpha: number) => {
  return useFormatColor({ r: color[0], g: color[1], b: color[2], a: alpha }, "rgba", "hexa");
};

const removeDuplicateHistory = (
  histories: HistoryItem[],
  colorToFind: string | null,
  allowedAlpha: boolean
) => {
  const duplicatedIndex = histories.findIndex((h) => {
    const color = formatColor(h.color, allowedAlpha ? h.alpha : 1);
    return color === colorToFind;
  });
  if (duplicatedIndex !== -1) {
    histories.splice(duplicatedIndex, 1);
  }
  return histories;
};

const addHistory = (history: HistoryItem, limit: number, allowedAlpha: boolean) => {
  const colorToFind = formatColor(history.color, allowedAlpha ? history.alpha : 1);
  let newHistory = [...state.value.histories];
  newHistory = removeDuplicateHistory(newHistory, colorToFind, allowedAlpha);
  state.value.histories = [history, ...newHistory].slice(0, limit);
};

const initializeHistory = (defaultHistory: HistoryItem[], limit: number) => {
  state.value.histories = defaultHistory.slice(0, limit);
};

function dispatch(action: Action, options?: Partial<DispatchOptions>) {
  const defaultOptions: DispatchOptions = {
    limit: HISTORY_LIMIT,
    defaultHistory: defaultPalette,
    allowedAlpha: false
  };

  const opts = { ...defaultOptions, ...options };
  const { limit, defaultHistory, allowedAlpha } = opts;

  switch (action.type) {
    case actionTypes.ADD_HISTORY:
      addHistory(action.history, limit, allowedAlpha);
      break;

    case actionTypes.REMOVE_HISTORY:
      state.value.histories = removeDuplicateHistory(
        state.value.histories,
        formatColor(action.history.color, allowedAlpha ? action.history.alpha : 1),
        allowedAlpha
      );
      break;

    case actionTypes.CLEAR_HISTORY:
      state.value.histories = [];
      break;

    case actionTypes.INIT_HISTORY:
      initializeHistory(defaultHistory, limit);
      break;
  }
}

function history(
  options?: Partial<DispatchOptions>,
  cb?: (value: { color: number[]; alpha: number }[]) => void
) {
  const init = () => {
    dispatch({ type: actionTypes.INIT_HISTORY }, options);
    cb && cb(state.value.histories);
  };
  const remove = (props: HistoryItem) => {
    dispatch({ type: actionTypes.REMOVE_HISTORY, history: props }, options);
    cb && cb(state.value.histories);
  };
  const clear = () => {
    dispatch({ type: actionTypes.CLEAR_HISTORY }, options);
    cb && cb(state.value.histories);
  };
  const create = (props: HistoryItem) => {
    dispatch({ type: actionTypes.ADD_HISTORY, history: props }, options);
    cb && cb(state.value.histories);
  };

  return {
    remove,
    create,
    clear,
    init
  };
}

function useHistory(
  options?: Partial<DispatchOptions>,
  onChange?: (value: { color: number[]; alpha: number }[]) => void
) {
  const onHistoryChange = (value: { color: number[]; alpha: number }[]) => {
    onChange && onChange(value);
  };

  return {
    histories: computed(() => state.value.histories),
    history: () => history(options, onHistoryChange)
  };
}

export { useHistory, defaultPalette, type HistoryItem };
