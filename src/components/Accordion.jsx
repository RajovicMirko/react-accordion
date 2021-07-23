import { useEffect, useReducer } from 'react'

const defaultState = {
  activeIndexes: [],
  defaults: {
    isMultiple: false,
    defaultOpenIndexes: [],
  }
}

const reducerTypes = {
  init: 'INIT_STATE_ON_MOUNT',
  clear: 'CLEAR_STATE_ON_UNMOUNT',
  setIndex: 'SET_ACTIVE_INDEX',
  removeIndex: 'REMOVE_ACTIVE_INDEX',
}

const accordionReducer = (state, { type, payload }) => {
  const { isMultiple } = state.defaults;

  switch (type) {
    case reducerTypes.init:
      const activeIndexes = payload.defaultOpenIndexes && payload.defaultOpenIndexes.length ? payload.defaultOpenIndexes : defaultState.defaults.defaultOpenIndexes;
      const defaults = { ...state.defaults, ...payload };
      return { ...state, activeIndexes, defaults }

    case reducerTypes.clear: return defaultState;

    case reducerTypes.setIndex:
      return isMultiple
        ? { ...state, activeIndexes: [...state.activeIndexes, payload] }
        : { ...state, activeIndexes: [payload] };

    case reducerTypes.removeIndex:
      return isMultiple
        ? { ...state, activeIndexes: state.activeIndexes.filter((index) => index !== payload) }
        : { ...state, activeIndexes: [] };
    default: return state;
  }
}

const createIndex = (index) => isNaN(index) ? index : Number(index);

function Accordion({ children, defaults = {} }) {
  const [state, dispatchState] = useReducer(accordionReducer, defaultState)

  const indexExists = (index) => state.activeIndexes.includes(index);

  const handleAccordionRowClick = (event) => {
    const { removeIndex, setIndex } = reducerTypes;

    const index = createIndex(event.currentTarget.dataset.id);
    const dispatchActionType = indexExists(index) ? removeIndex : setIndex;

    dispatchState({ type: dispatchActionType, payload: index });
  }

  useEffect(() => {
    dispatchState({ type: reducerTypes.init, payload: defaults });
    return () => dispatchState({ type: reducerTypes.clear });
  }, []);

  const renderProps = {
    onClick: handleAccordionRowClick,
    isActive: (index) => indexExists(index),
  }

  return children(renderProps);
}

export default Accordion
