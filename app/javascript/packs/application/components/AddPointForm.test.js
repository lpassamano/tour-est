import { AddPointForm } from "./AddPointForm";
import React from "react";
import { shallow } from "enzyme";

describe("<AddPointForm />", () => {
  const setup = () => {
    const tourId = "1";
    const onHide = jest.fn();
    const onCreatePoint = jest.fn();
    const component = shallow(
      <AddPointForm
        tourId={tourId}
        onHide={onHide}
        onCreatePoint={onCreatePoint}
      />
    );
    return component;
  };

  test("render", () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });

  test("handleChange - when text is typed into the fields the state is updated", () => {
    const component = setup();
    const event = { target: { name: "caption", value: "Nike of Samothrace" } };
    component.find('[name="caption"]').simulate("change", event);
    expect(component.state("caption")).toEqual("Nike of Samothrace");
  });
});
