import LoginForm from "./LoginForm";
import { shallow, mount } from "enzyme";
import React from "react";

describe("<LoginForm />", () => {
  const setup = ({ onLogin = jest.fn(), navigate = jest.fn() }) => {
    const component = mount(
      <LoginForm onLogin={onLogin} navigate={navigate} />
    );
    const event1 = { target: { name: "username", value: "leigh" } };
    const event2 = { target: { name: "password", value: "123abc" } };
    component.find("input#username").simulate("change", event1);
    component.find("input#password").simulate("change", event2);
    return component;
  };

  test("onSubmit - when submit is clicked the current values of username and password are submitted", done => {
    const onLogin = jest.fn();
    const navigate = to => {
      expect(to).toEqual("/admin");
      done();
    };
    onLogin.mockResolvedValue({ ok: true });
    const component = setup({ onLogin, navigate });
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
