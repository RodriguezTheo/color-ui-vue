import { useFormatColor } from "@/shared/useConvertColor";
import type { ColorFormat, ColorSelected, HSL, InputColor, RGB } from "@/shared/types";
import { type ModelRef } from "vue";

const actions = {
  UPDATE_HEX: "UPDATE_HEX",
  UPDATE_HSL: "UPDATE_HSL",
  UPDATE_RGB: "UPDATE_RGB",
  UPDATE_ALPHA: "UPDATE_ALPHA"
} as const;

type ActionType = typeof actions;

type Action =
  | {
      type: ActionType["UPDATE_HEX"];
      color: { r: number; g: number; b: number };
      alpha: number;
    }
  | {
      type: ActionType["UPDATE_HSL"];
      color: number[];
    }
  | {
      type: ActionType["UPDATE_RGB"];
      color: number[];
    }
  | {
      type: ActionType["UPDATE_ALPHA"];
      value: number;
    };

type ActionReturnMap = {
  [actions.UPDATE_HEX]: string | undefined;
  [actions.UPDATE_HSL]: { h: number; s: number; l: number };
  [actions.UPDATE_RGB]: { r: number; g: number; b: number };
  [actions.UPDATE_ALPHA]: number;
};

type ActionReturnType<T extends Action["type"]> = ActionReturnMap[T];

type DispatchOptions = {
  allowedAlpha?: boolean;
  colorFormat?: ColorFormat;
};

const updateInputHex = (
  color: { r: number; g: number; b: number },
  alpha: number,
  allowedAlpha?: boolean
) => {
  const testColor = useFormatColor({ ...color, a: allowedAlpha ? alpha : 1 }, "rgba", "hexa");
  if (testColor) {
    return testColor;
  }
  return undefined;
};

const updateInputHsl = (color: number[]) => {
  const [h, s, l] = color;
  return { h, s, l };
};

const updateInputRgb = (color: number[]) => {
  const [r, g, b] = color;
  return { r, g, b };
};

const updateInputAlpha = (value: number, allowedAlpha?: boolean) => {
  return allowedAlpha ? value : 1;
};

function dispatch<T extends Action["type"]>(
  action: Action,
  options?: Partial<DispatchOptions>
): ActionReturnType<T> {
  const defaultOptions: DispatchOptions = {
    allowedAlpha: false
  };

  const opts = { ...defaultOptions, ...options };
  const { allowedAlpha } = opts;

  switch (action.type) {
    case actions.UPDATE_HEX:
      return updateInputHex(action.color, action.alpha, allowedAlpha) as ActionReturnType<T>;

    case actions.UPDATE_HSL:
      return updateInputHsl(action.color) as ActionReturnType<T>;

    case actions.UPDATE_RGB:
      return updateInputRgb(action.color) as ActionReturnType<T>;

    case actions.UPDATE_ALPHA:
      return updateInputAlpha(action.value, allowedAlpha) as ActionReturnType<T>;
  }
}

function updateInput(options?: Partial<DispatchOptions>) {
  const hex = (color: RGB, alpha: number, cb: (value: string) => void) => {
    const hexInput = dispatch(
      { type: actions.UPDATE_HEX, color, alpha },
      options
    ) as ActionReturnType<"UPDATE_HEX">;
    if (hexInput) {
      return cb(hexInput);
    }
  };

  const hsl = (color: number[], cb: (value: HSL) => void) => {
    const hslInput = dispatch(
      { type: actions.UPDATE_HSL, color },
      options
    ) as ActionReturnType<"UPDATE_HSL">;
    return cb(hslInput);
  };

  const rgb = (color: number[], cb: (value: RGB) => void) => {
    const rgbInput = dispatch(
      { type: actions.UPDATE_RGB, color },
      options
    ) as ActionReturnType<"UPDATE_RGB">;
    return cb(rgbInput);
  };

  const alpha = (value: number, cb: (value: number) => void) => {
    const alphaInput = dispatch(
      { type: actions.UPDATE_ALPHA, value },
      options
    ) as ActionReturnType<"UPDATE_ALPHA">;
    return cb(alphaInput);
  };

  return {
    hex,
    hsl,
    rgb,
    alpha
  };
}

const actionsModelValue = {
  FORMAT_HEX: "FORMAT_HEX",
  FORMAT_HSL: "FORMAT_HSL",
  FORMAT_RGB: "FORMAT_RGB"
} as const;

type ActionTypeModelValue = typeof actionsModelValue;

type ActionModelValue =
  | {
      type: ActionTypeModelValue["FORMAT_HEX"];
      color: string;
    }
  | {
      type: ActionTypeModelValue["FORMAT_HSL"];
      color: HSL;
      alpha?: number;
    }
  | {
      type: ActionTypeModelValue["FORMAT_RGB"];
      color: RGB;
      alpha?: number;
    };

type DispatchOptionsModelValue = {
  colorFormat?: ColorFormat;
  allowedAlpha?: boolean;
};

function dispatchModelValue(
  action: ActionModelValue,
  options?: Partial<DispatchOptionsModelValue>
) {
  const defaultOptions: DispatchOptionsModelValue = {
    allowedAlpha: false
  };

  const opts = { ...defaultOptions, ...options };
  const { allowedAlpha } = opts;

  switch (action.type) {
    case actionsModelValue.FORMAT_RGB:
      if (allowedAlpha) {
        return { ...action.color, a: action.alpha ?? 1 };
      }
      return { ...action.color };
    case actionsModelValue.FORMAT_HEX:
      return action.color;

    case actionsModelValue.FORMAT_HSL:
      if (allowedAlpha) {
        return { ...action.color, a: action.alpha ?? 1 };
      }
      return action.color;
  }
}

const updateModelValue = (
  modelValue: ModelRef<ColorSelected | undefined>,
  colors: {
    colorSelected: number[];
    inputs: InputColor;
    alpha: number;
  },
  options: {
    colorFormat: ColorFormat;
    allowedAlpha?: boolean;
  }
) => {
  const { inputs, colorSelected, alpha } = colors;
  const { colorFormat, allowedAlpha } = options;

  if (colorFormat === "rgb") {
    modelValue.value = dispatchModelValue(
      {
        type: actionsModelValue.FORMAT_RGB,
        color: { r: colorSelected[0], g: colorSelected[1], b: colorSelected[2] },
        alpha
      },
      { allowedAlpha }
    );
  }

  if (colorFormat === "hsl") {
    const { h, s, l } = inputs;
    modelValue.value = dispatchModelValue(
      {
        type: actionsModelValue.FORMAT_HSL,
        color: { h, s, l },
        alpha
      },
      { allowedAlpha }
    );
  }

  if (colorFormat === "hex") {
    modelValue.value = dispatchModelValue(
      {
        type: actionsModelValue.FORMAT_HEX,
        color: inputs.hex
      },
      { allowedAlpha }
    );
  }
};

type UseColorsOptions = {
  colorFormat: ColorFormat;
  allowedAlpha: boolean;
};

export default (options: UseColorsOptions) => {
  const { allowedAlpha, colorFormat } = options;
  return {
    updateInput: updateInput({ allowedAlpha }),
    updateModelValue: (
      modelValue: ModelRef<ColorSelected | undefined>,
      colors: {
        colorSelected: number[];
        inputs: InputColor;
        alpha: number;
      }
    ) => {
      return updateModelValue(modelValue, colors, {
        colorFormat,
        allowedAlpha
      });
    }
  };
};
