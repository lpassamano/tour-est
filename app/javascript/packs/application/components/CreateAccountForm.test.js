import CreateAccountForm from "./CreateAccountForm";
import { shallow, mount } from "enzyme";
import React from "react";

describe("<CreateAccountForm />", () => {
  const setup = props => {
    const component = mount(<CreateAccountForm {...props} />);
    const event1 = { target: { name: "username", value: "leigh" } };
    const event2 = { target: { name: "password", value: "12345abcde" } };
    const event3 = { target: { name: "cultural_center", value: "Met Museum" } };
    component.find("input#username").simulate("change", event1);
    component.find("input#password").simulate("change", event2);
    component.find("input#cultural_center").simulate("change", event3);
    return component;
  };

  test("onSubmit - when submit is clicked the current values of username, password, and cultural center are submitted", done => {
    const onCreateUser = jest.fn();
    const navigate = to => {
      expect(to).toEqual("/");
      done();
    };
    onCreateUser.mockResolvedValue({ ok: true });
    const component = setup({ onCreateUser, navigate });
    component.find("form").simulate("submit", { preventDefault: () => null });
    expect(onCreateUser).toHaveBeenCalledWith({ username: "leigh", password: "12345abcde", cultural_center: "Met Museum"});
  });

  test("handleChange - when text is typed into the email, password, and cultural center fields the state is updated", () => {
    const component = setup({});
    expect(component.state("username")).toEqual("leigh");
    expect(component.state("password")).toEqual("12345abcde");
    expect(component.state("cultural_center")).toEqual("Met Museum");
  });

  test("render", () => {
    // creates a snapshot of the HTML that is rendered and if it changes the tests will fail
    // update the snapshot yarn test -u
    // google jest snapshot for more info
    const component = setup({});
    expect(component).toMatchSnapshot();
  });
});
