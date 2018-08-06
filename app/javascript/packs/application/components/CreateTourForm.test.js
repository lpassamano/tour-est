import CreateTourForm from "./CreateTourForm";
import React from "react";
import { mount } from "enzyme";

describe("<CreateTourForm />", () => {
  test("onSubmit - when create button is clicked the current value of title is submitted", () => {});

  test("handleChange - when text is typed into the title field the state is updated", () => {
    const onCreateTour = jest.fn();
    const component = mount(<CreateTourForm onCreateTour={onCreateTour} />);
    const event = { target: { name: "title", value: "Best Tour Ever!" } };
    component.find("input#title").simulate("change", event);
    expect(component.state("title")).toEqual("Best Tour Ever!");
  });

  test("render", () => {
    const onCreateTour = jest.fn();
    const component = mount(<CreateTourForm onCreateTour={onCreateTour} />);
    expect(component).toMatchSnapshot();
  });
});
