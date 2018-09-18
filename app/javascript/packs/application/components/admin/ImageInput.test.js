import { ImageInput } from "./ImageInput";
import React from "react";
import { shallow } from "enzyme";

describe("<ImageInput />", () => {
  const setup = () => {
    const onChange = jest.fn();
    const name = "image";
    const value = undefined;
    const component = shallow(
      <ImageInput onChange={onChange} name={name} value={value} />
    );
    return component;
  };

  test("render", () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });
});
