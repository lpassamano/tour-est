export const getTours = state => {
  return Object.values(state.tours.data);
};

export const isFetching = state => {
  return state.tours.isFetching;
};
