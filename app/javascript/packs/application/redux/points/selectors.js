export const getPoints = state => {
  return Object.values(state.points.data);
};

export const getPoint = (state, pointId) => {
  return state.points.data[pointId];
};

export const isFetching = state => {
  return state.points.isFetching;
};
