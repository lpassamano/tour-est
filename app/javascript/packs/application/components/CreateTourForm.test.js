import CreateTourForm from "./CreateTourForm";
import React from "react";
import { mount } from "enzyme";

describe("<CreateTourForm />", () => {
  const setup = ({ onCreateTour = jest.fn(), navigate = jest.fn() }) => {
    const currentStaffUser = { id: 1, cultural_center: { id: 1 } };
    const component = mount(
      <CreateTourForm
        onCreateTour={onCreateTour}
        navigate={navigate}
        currentStaffUser={currentStaffUser}
      />
    );
    return component;
  };

  test("onSubmit - when create button is clicked the current value of title is submitted", done => {
    const onCreateTour = jest.fn();
    onCreateTour.mockResolvedValue({ ok: true });
    const navigate = to => {
      expect(to).toEqual("/admin");
      done();
    };
    const component = setup({ onCreateTour, navigate });
    const event = { target: { name: "title", value: "Best Tour Ever!" } };
    component.find("input#title").simulate("change", event);
    component.find("form").simulate("submit", { preventDefault: () => null });
    expect(onCreateTour).toHaveBeenCalledWith({
      tour: {
        title: "Best Tour Ever!",
        staff_user_id: 1,
        cultural_center_id: 1
      }
    });
  });

  test("handleChange - when text is typed into the title field the state is updated", () => {
    const component = setup({});
    const event = { target: { name: "title", value: "Best Tour Ever!" } };
    component.find("input#title").simulate("change", event);
    expect(component.state("title")).toEqual("Best Tour Ever!");
  });

  test("render", () => {
    const component = setup({});
    expect(component).toMatchSnapshot();
  });
});
