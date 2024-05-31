export const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: null,
};

export const handleNumber = (value, state) => {
  const { currentValue } = state;

  if (value === "." && !currentValue.includes(".")) {
    return { ...state, currentValue: `${currentValue}.` };
  }

  if (currentValue === "0" && value !== ".") {
    return { ...state, currentValue: `${value}` };
  }

  return {
    ...state,
    currentValue: `${currentValue}${value}`,
  };
};

export const handleDelete = (state) => {
  const { currentValue } = state;
  if (currentValue.length > 1) {
    const newValue = currentValue.slice(0, -1);
    return { ...state, currentValue: newValue };
  }
  return { ...state, currentValue: "0" };
};

export const handleRad = (state) => {
  // Toggle between radian and degree mode
  const isRadian = state.isRadian || false;
  return { ...state, isRadian: !isRadian };
};

export const handleSquareRoot = (state) => {
  const currentValue = parseFloat(state.currentValue);
  const squareRootValue = Math.sqrt(currentValue);
  return { ...state, currentValue: squareRootValue.toString() };
};


export const handleSin = (state) => {
  const currentValue = parseFloat(state.currentValue);
  const sinValue = Math.sin(currentValue);
  return { ...state, currentValue: sinValue.toString() };
};

export const handleCos = (state) => {
  const currentValue = parseFloat(state.currentValue);
  const cosValue = Math.cos(currentValue);
  return { ...state, currentValue: cosValue.toString() };
};

export const handleTan = (state) => {
  const currentValue = parseFloat(state.currentValue);
  const tanValue = Math.tan(currentValue);
  return { ...state, currentValue: tanValue.toString() };
};


export const handleInv = (state) => {
  // Toggle between normal and inverse trigonometric functions
  const isInverse = state.isInverse || false;
  return { ...state, isInverse: !isInverse };
};


export const handleExponent = (state) => {
  const currentValue = parseFloat(state.currentValue);
  const exponentValue = Math.exp(currentValue);
  return { ...state, currentValue: exponentValue.toString() };
};


export const handleE = (state) => {
  // Set the current value to the mathematical constant 'e'
  return { ...state, currentValue: Math.E.toString() };
};


export const handleIn = (state) => {
  const currentValue = parseFloat(state.currentValue);
  const logValue = Math.log(currentValue);
  return { ...state, currentValue: logValue.toString() };
};


export const handleLog = (state) => {
  const currentValue = parseFloat(state.currentValue);
  const log10Value = Math.log10(currentValue);
  return { ...state, currentValue: log10Value.toString() };
};


const handleEqual = (state) => {
  const { currentValue, previousValue, operator } = state;
  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
  const resetState = { operator: null, previousValue: null };

  let result;
  switch (operator) {
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
    case "*":
      result = previous * current;
      break;
    case "/":
      result = previous / current;
      break;
    case "^":
      result = Math.pow(previous, current);
      break;
    default:
      return state;
  }

  return {
    currentValue: result.toString(),
    ...resetState,
  };
};


const calculator = (type, value, state) => {
  switch (type) {
    case "number":
      return handleNumber(value, state);
    case "clear":
      return initialState;
    case "delete":
      return handleDelete(state);
    case "posneg":
      return {
        ...state,
        currentValue: `${parseFloat(state.currentValue) * -1}`,
      };
    case "percentage":
      return {
        ...state,
        currentValue: `${parseFloat(state.currentValue) * 0.01}`,
      };
    case "operator":
      if (state.operator) {
        // Calculate result with the current operator before applying the new operator
        const newState = handleEqual(state);
        return {
          ...newState,
          operator: value,
          previousValue: newState.currentValue,
          currentValue: "0",
        };
      }
      return {
        operator: value,
        previousValue: state.currentValue,
        currentValue: "0",
      };
    case "equal":
      return handleEqual(state);

    // Handle other cases (rad, square-root, sin, cos, tan, inv, exponent, e, in, log)
    case "rad":
      return handleRad(state);
    case "square-root":
      return handleSquareRoot(state);
    case "sin":
      return handleSin(state);
    case "cos":
      return handleCos(state);
    case "tan":
      return handleTan(state);
    case "inv":
      return handleInv(state);
    case "exponent":
      return {
        operator: "^",
        previousValue: state.currentValue,
        currentValue: "0",
      };
    case "e":
      return handleE(state);
    case "in":
      return handleIn(state);
    case "log":
      return handleLog(state);

    default:
      return state;
  }
};


export default calculator;
