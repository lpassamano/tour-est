export const getTours = state => {
  return Object.values(state.tours.data);
};

export const getTour = (state, tourId) => {
  return state.tours.data[tourId];
};

export const isFetching = state => {
  return state.tours.isFetching;
};
