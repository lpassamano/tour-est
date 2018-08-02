import LoginForm from "./LoginForm";
import { shallow, mount } from "enzyme";
import React from "react";

describe("<LoginForm />", () => {
  test("onSubmit - when submit is clicked the current values of username and password are submitted", () => {
    const onLogin = jest.fn();
    const component = shallow(<LoginForm onLogin={onLogin} />);
    component.find("form").simulate("submit", { preventDefault: () => null });
    expect(onLogin).toHaveBeenCalledWith("", "");
  });

  test("handleChange - when text is typed into the email and password fields the state is updated", () => {
    const component = mount(<LoginForm />);
    const event1 = { target: { name: "username", value: "leigh" } };
    const event2 = { target: { name: "password", value: "123abc" } };
    component.find("input#username").simulate("change", event1);
    component.find("input#password").simulate("change", event2);
    expect(component.state("username")).toEqual("leigh");
    expect(component.state("password")).toEqual("123abc");
  });
});
