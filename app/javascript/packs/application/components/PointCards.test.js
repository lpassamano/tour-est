import { shallow } from "enzyme";
import { PointCards } from "./PointCards";
import React from "react";

describe("<PointCards />", () => {
  const setup = () => {
    const points = [];
    const tourId = "1";
    const isFetching = false;
    const listPoints = jest.fn();

    const component = shallow(
      <PointCards
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
