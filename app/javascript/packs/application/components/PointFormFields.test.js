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

  test("handleChangeImage - when a new image is uploaded handleChangeImage is called", () => {
    const component = setup({});
    component.find('[name="image"]').simulate("change", {
      preview: "blob:http://localhost:300/a3b6c1fa-93b9",
      name: "nike.jpeg",
      size: 197764,
      type: "image/jpeg"
    });

    expect(component.state("imageEdited")).toEqual(true);
    expect(component.state("image")).toEqual({
      preview: "blob:http://localhost:300/a3b6c1fa-93b9",
      name: "nike.jpeg",
      size: 197764,
      type: "image/jpeg"
    });
  });

  test("onSubmit - when button is clicked the current state is submitted without an image", () => {
    const onSubmit = jest.fn();
    onSubmit.mockResolvedValue({ ok: true, data: { id: 1 } });
    const component = setup({ onSubmit });
    fillIn(component.find('[name="title"]'), "Nike of Samothrace");
    submit(component.find("form"));

    expect(onSubmit).toHaveBeenCalledWith({
      title: "Nike of Samothrace",
      caption: "",
      description: "",
      directions: "",
      location: ""
    });
  });

  test("onSubmit - when button is clicked the current state is submitted with an image", () => {
    const onSubmit = jest.fn();
    onSubmit.mockResolvedValue({ ok: true, data: { id: 1 } });
    const component = setup({ onSubmit });
    fillIn(component.find('[name="title"]'), "Nike of Samothrace");
    component.find('[name="image"]').simulate("change", {
      preview: "blob:http://localhost:300/a3b6c1fa-93b9",
      name: "nike.jpeg",
      size: 197764,
      type: "image/jpeg"
    });
    submit(component.find("form"));

    expect(onSubmit).toHaveBeenCalledWith({
      title: "Nike of Samothrace",
      caption: "",
      description: "",
      directions: "",
      location: "",
      image: {
        preview: "blob:http://localhost:300/a3b6c1fa-93b9",
        name: "nike.jpeg",
        size: 197764,
        type: "image/jpeg"
      }
    });
  });

  test("render", () => {
    const component = setup({});
    expect(component).toMatchSnapshot();
  });
});
