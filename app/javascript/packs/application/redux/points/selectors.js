export const getPoints = state => {
  return Object.values(state.points.data);
};

export const getPoint = (state, pointId) => {
  return state.points.data[pointId];
};

export const isFetching = state => {
  return state.points.isFetching;
};

export const getNextPoint = (state, pointId) => {
  const points = getPoints(state);
  const { order_key } = getPoint(state, pointId);
  return points.find(point => point.order_key === order_key + 1);
};
