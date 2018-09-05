import { AddPointForm } from "./AddPointForm";
import React from "react";
import { shallow } from "enzyme";

describe("<AddPointForm />", () => {
  const setup = ({ onCreatePoint = jest.fn() }) => {
    const tourId = "1";
    const onHide = jest.fn();
    const component = shallow(
      <AddPointForm
        tourId={tourId}
        onHide={onHide}
        onCreatePoint={onCreatePoint}
      />
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

  test("render", () => {
    const component = setup({});
    expect(component).toMatchSnapshot();
  });

  test("handleChange - when text is typed into the fields the state is updated", () => {
    const component = setup({});
    const event = { target: { name: "caption", value: "Nike of Samothrace" } };
    component.find('[name="caption"]').simulate("change", event);
    expect(component.state("caption")).toEqual("Nike of Samothrace");
  });

  test("onSubmit - when save button is clicked the current values of the form fields are submitted", () => {
    const onCreatePoint = jest.fn({});
    onCreatePoint.mockResolvedValue({ ok: true, data: { id: 1 } });
    const component = setup({ onCreatePoint });
    fillIn(component.find('[name="caption"]'), "Nike of Samothrace");
    submit(component.find("form"));

    expect(onCreatePoint).toHaveBeenCalledWith("1", {
      point: {
        title: "",
        caption: "Nike of Samothrace",
        image: undefined,
        description: "",
        directions: "",
        location: ""
      }
    });
  });
});
