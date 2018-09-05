import { TourFormFields } from "./TourFormFields";
import React from "react";
import { shallow } from "enzyme";

describe("<TourFormFields />", () => {
  const setup = ({ onSubmit = jest.fn() }, initialValues = { title: "" }) => {
    const component = shallow(
      <TourFormFields onSubmit={onSubmit} initialValues={initialValues} />
    );
    return component;
  };

  const fillIn = (input, value) => {
    input.simulate("change", {
      target: { value, name: input.prop("name") }
    });
  };

  const submit = form => {
    form.simulate("submit", { preventDefault: () => null });
  };

  test("handleChange - when text is typed into the title field onChange is called", () => {
    const component = setup({});
    fillIn(component.find('[name="title"]'), "Best Tour Ever!");
    expect(component.state("title")).toEqual("Best Tour Ever!");
  });

  test("onSubmit - when button is clicked the current state is submitted", () => {
    const onSubmit = jest.fn();
    onSubmit.mockResolvedValue({ ok: true, data: { id: 1 } });
    const component = setup({ onSubmit });
    component.setState({ title: "New Tour" });
    submit(component.find("form"));

    expect(onSubmit).toHaveBeenCalledWith({
      title: "New Tour",
      description: "",
      directions: "",
      estimated_time: "",
      starting_point: ""
    });
  });

  test("Update Tour - when initialValues is passed as a prop the state is updated", () => {
    const initialValues = {
      id: 1,
      title: "Your Tour",
      description: "a tour",
      directions: "go to the place and make a left",
      estimated_time: "1 hr",
      starting_point: "the place"
    };
    const component = setup({}, initialValues);
    expect(component.state()).toEqual(initialValues);
  });

  test("render", () => {
    const component = setup({});
    expect(component).toMatchSnapshot();
  });
});
