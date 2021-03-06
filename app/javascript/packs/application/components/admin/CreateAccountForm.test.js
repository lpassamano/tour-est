import { CreateAccountForm } from "./CreateAccountForm";
import { shallow } from "enzyme";
import React from "react";

describe("<CreateAccountForm />", () => {
  const setup = ({ onCreateUser = jest.fn() }) => {
    const component = shallow(
      <CreateAccountForm onCreateUser={onCreateUser} />
    );
    const event1 = { target: { name: "username", value: "leigh" } };
    const event2 = { target: { name: "password", value: "12345abcde" } };
    const event3 = {
      target: { name: "password_confirmation", value: "12345abcde" }
    };
    const event4 = { target: { name: "cultural_center", value: "Met Museum" } };
    component.find('[name="username"]').simulate("change", event1);
    component.find('[name="password"]').simulate("change", event2);
    component.find('[name="password_confirmation"]').simulate("change", event3);
    component.find('[name="cultural_center"]').simulate("change", event4);
    return component;
  };

  test("onSubmit - when submit is clicked the current values of username, password, and cultural center are submitted", () => {
    const onCreateUser = jest.fn();
    onCreateUser.mockResolvedValue({ ok: true });
    const component = setup({ onCreateUser });

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
