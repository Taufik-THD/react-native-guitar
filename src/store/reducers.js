const chordReducers = (state, action) => {
  let newState;

  switch (action.type) {
    case 'SET_SCALES':
      newState = [];
      newState = [...action.payload];

      return { ...state, scales: newState };

    case 'SET_TUNING':
      newState = state.scales.slice();
      const filterState = element => element.name === action.payload.name && element.octave === action.payload.octave;
      const index = newState.findIndex(filterState);

      if (index !== -1) newState[index].hitted = true;
      
      setTimeout(() => {
        if (index !== -1) newState[index].hitted = false;
        return { ...state, scales: newState };
      }, 20);

    return { ...state, scales: newState };

    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: {
          ...action.payload,
          courses: {
            ...action.payload.courses,
          },
        },
      };
    case 'GET_CHORDS':
      const newArr = [...action.payload.map(el => (el = { ...el }))];
      return {
        ...state,
        allChords: newArr,
      };
    default:
      return state;
  }
};

export default chordReducers;
