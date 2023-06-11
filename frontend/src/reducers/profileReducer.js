const initialState = null;

const profileReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'SELECT_PROFILE':
      return action.payload;
    default:
      return state;
  }
};

export default profileReducer;
