import { shallow } from "enzyme";
import { PointsList } from "./PointsList";
import React from "react";

describe("<PointsList />", () => {
  const setup = () => {
    const points = [];
    const tourId = "1";
    const isFetching = false;
    const listPoints = jest.fn();

    const component = shallow(
      <PointsList
        points={points}
        tourId={tourId}
        isFetching={isFetching}
        listPoints={listPoints}
      />
    );
  };

  test("render", () => {
    const component = setup({});
    expect(component).toMatchSnapshot();
  });
});
