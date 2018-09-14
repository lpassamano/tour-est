import { LoginForm } from "./LoginForm";
import { shallow } from "enzyme";
import React from "react";

describe("<LoginForm />", () => {
  const setup = ({ onLogin = jest.fn() }) => {
    const component = shallow(<LoginForm onLogin={onLogin} />);
    const event1 = { target: { name: "username", value: "leigh" } };
    const event2 = { target: { name: "password", value: "123abc" } };
    component.find('[name="username"]').simulate("change", event1);
    component.find('[name="password"]').simulate("change", event2);
    return component;
  };

  test("onSubmit - when submit is clicked the current values of username and password are submitted", () => {
    const onLogin = jest.fn();

    onLogin.mockResolvedValue({ ok: true });
    const component = setup({ onLogin });
    component.find("form").simulate("submit", { preventDefault: () => null });
    expect(onLogin).toHaveBeenCalledWith("leigh", "123abc");
  });

  test("handleChange - when text is typed into the email and password fields the state is updated", () => {
    const component = setup({});
    expect(component.state("username")).toEqual("leigh");
    expect(component.state("password")).toEqual("123abc");
  });

  test("render", () => {
    const component = setup({});
    expect(component).toMatchSnapshot();
  });
});
