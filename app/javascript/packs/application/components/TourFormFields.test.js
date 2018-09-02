import { TourFormFields } from "./TourFormFields";
import React from "react";
import { shallow } from "enzyme";

describe("<TourFormFields />", () => {
  const setup = ({ onChange = jest.fn() }) => {
    const tour = { title: "Awesome Tour" };
    const component = shallow(
      <TourFormFields onChange={onChange} tour={tour} />
    );
    return component;
  };

  const fillIn = (input, value) => {
    input.simulate("change", {
      target: { value, name: input.prop("name") }
    });
  };

  test("handleChange - when text is typed into the title field onChange is called", () => {
    const onChange = jest.fn();
    const component = setup({ onChange });
    fillIn(component.find('[name="title"]'), "Best Tour Ever!");
    expect(onChange).toHaveBeenCalledWith({
      target: { name: "title", value: "Best Tour Ever!" }
    });
  });

  test("render", () => {
    const component = setup({});
    expect(component).toMatchSnapshot();
  });
});
