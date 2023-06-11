export const selectProfile = (profile) => ({
    type: 'SELECT_PROFILE',
    payload: profile
  });
  
  export const deselectProfile = () => ({
    type: 'DESELECT_PROFILE'
  });
  