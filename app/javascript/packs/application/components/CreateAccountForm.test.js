import CreateAccountForm from "./CreateAccountForm";
import { shallow, mount } from "enzyme";
import React from "react";

describe("<CreateAccountForm />", () => {
  const setup = ({ onCreateUser = jest.fn(), navigate = jest.fn() }) => {
    const component = mount(
      <CreateAccountForm onCreateUser={onCreateUser} navigate={navigate} />
    );
    const event1 = { target: { name: "username", value: "leigh" } };
    const event2 = { target: { name: "password", value: "12345abcde" } };
    const event3 = {
      target: { name: "password_confirmation", value: "12345abcde" }
    };
    const event4 = { target: { name: "cultural_center", value: "Met Museum" } };
    component.find("input#username").simulate("change", event1);
    component.find("input#password").simulate("change", event2);
    component.find("input#password_confirmation").simulate("change", event3);
    component.find("input#cultural_center").simulate("change", event4);
    return component;
  };

  test("onSubmit - when submit is clicked the current values of username, password, and cultural center are submitted", done => {
    const onCreateUser = jest.fn();
    const navigate = to => {
      expect(to).toEqual("/admin");
      done();
    };
    onCreateUser.mockResolvedValue({ ok: true });
    const component = setup({ onCreateUser, navigate });
    component.find("form").simulate("submit", { preventDefault: () => null });
    expect(onCreateUser).toHaveBeenCalledWith({
      user: {
        username: "leigh",
        password: "12345abcde",
        password_confirmation: "12345abcde"
      },
      cultural_center: {
        name: "Met Museum"
      }
    });
  });

  test("handleChange - when text is typed into the email, password, and cultural center fields the state is updated", () => {
    const component = setup({});
    expect(component.state("username")).toEqual("leigh");
    expect(component.state("password")).toEqual("12345abcde");
    expect(component.state("cultural_center")).toEqual("Met Museum");
  });

  test("render", () => {
    const component = setup({});
    expect(component).toMatchSnapshot();
  });
});
