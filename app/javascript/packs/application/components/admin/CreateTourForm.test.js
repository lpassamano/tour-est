import { CreateTourForm } from "./CreateTourForm";
import React from "react";
import { shallow } from "enzyme";

describe("<CreateTourForm />", () => {
  const setup = () => {
    const onCreateTour = jest.fn();
    const component = shallow(<CreateTourForm onCreateTour={onCreateTour} />);
    return component;
  };

  test("render", () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });
});
