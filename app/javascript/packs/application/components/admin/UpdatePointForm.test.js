import { UpdatePointForm } from "./UpdatePointForm";
import React from "react";
import { shallow } from "enzyme";

describe("<UpdatePointForm />", () => {
  const setup = () => {
    const point = { title: "Point 1", id: 1 };
    const onUpdatePoint = jest.fn();
    const onHide = jest.fn();
    const tourId = "1";
    const component = shallow(
      <UpdatePointForm
        point={point}
        onUpdatePoint={onUpdatePoint}
        onHide={onHide}
        tourId={tourId}
      />
    );
  };

  test("render", () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });
});
