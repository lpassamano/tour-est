export const getPoints = state => {
  return Object.values(state.points.data);
};

export const isFetching = state => {
  return state.points.isFetching;
};
