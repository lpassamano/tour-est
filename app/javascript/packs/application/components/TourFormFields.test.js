import { TourFormFields } from "./TourFormFields";
import React from "react";
import { shallow } from "enzyme";

describe("<TourFormFields />", () => {
  const setup = ({ onSubmit = jest.fn() }) => {
    const tour = { title: "Awesome Tour" };
    const component = shallow(
      <TourFormFields onSubmit={onSubmit} tour={tour} />
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
    console.log(component.props.onSubmitu);
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

  test("render", () => {
    const component = setup({});
    expect(component).toMatchSnapshot();
  });
});
