import { AddPointForm } from "./AddPointForm";
import React from "react";
import { shallow } from "enzyme";

describe("<AddPointForm />", () => {
  test("render", () => {
    const component = shallow(<AddPointForm />);
    expect(component).toMatchSnapshot();
  });

  test("handleChange - when text is typed into the fields the state is updated", () => {
    const handlePointChange = jest.fn();
    const component = shallow(
      <AddPointForm
        key={"1"}
        index={"1"}
        handlePointChange={handlePointChange}
      />
    );
    const event = { target: { name: "caption", value: "Nike of Samothrace" } };
    component.find("textarea#caption").simulate("change", event);
    expect(component.state("caption")).toEqual("Nike of Samothrace");
  });
});
