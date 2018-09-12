import { PointFormFields } from "./PointFormFields";
import React from "react";
import { shallow } from "enzyme";

describe("<PointFormFields />", () => {
  const setup = ({ onSubmit = jest.fn() }) => {
    const onHide = jest.fn();
    const component = shallow(
      <PointFormFields onSubmit={onSubmit} onHide={onHide} />
    );
    return component;
  };

  const fillIn = (input, value) => {
    input.simulate("change", {
      target: { value, name: input.prop("name") }
    });
  };

  const submit = form => {
    const mockedEvent = { preventDefault: jest.fn(), target: {} };
    form.simulate("submit", mockedEvent);
  };

  test("handleChange - when text is typed into the fields onChange is called", () => {
    const component = setup({});
    fillIn(component.find('[name="title"]'), "Nike of Samothrace");
    expect(component.state("title")).toEqual("Nike of Samothrace");
  });

  test("onSubmit - when button is clicked the current state is submitted", () => {
    const onSubmit = jest.fn();
    onSubmit.mockResolvedValue({ ok: true, data: { id: 1 } });
    const component = setup({ onSubmit });
    fillIn(component.find('[name="caption"]'), "Nike of Samothrace");
    submit(component.find("form"));

    expect(onSubmit).toHaveBeenCalledWith({
      title: "",
      caption: "Nike of Samothrace",
      image: undefined,
      description: "",
      directions: "",
      location: "",
      imageEdited: false
    });
  });

  test("render", () => {
    const component = setup({});
    expect(component).toMatchSnapshot();
  });
});
