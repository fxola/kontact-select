import "react-native";
import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react-native";
import { expect, it } from "@jest/globals";
import CustomModal from "./index";
import ContactItem from "../ContactItem";

describe("When the Modal Component renders", () => {
  afterEach(cleanup);
  const toggleModalMock = jest.fn();

  const childProp = {
    item: {
      image: undefined,
      name: "Sam ",
      label: "home",
      number: "08067734477634",
      id: "10jdhfj8"
    },
    handleContactSelect: jest.fn()
  };

  const ModalProps = {
    visible: true,
    toggleModal: toggleModalMock,
    children: <ContactItem {...childProp} />
  };

  it("renders the Modal contents Correctly", async () => {
    const { getByTestId } = render(<CustomModal {...ModalProps} />);
    const modalWrapper = getByTestId("child-container");

    expect(modalWrapper.props.children[0].props.item).toBe(childProp.item);
    expect(modalWrapper.props.children[0].props.handleContactSelect).toBe(
      childProp.handleContactSelect
    );
  });

  it("Closes the Modal", async () => {
    const { getByTestId } = render(<CustomModal {...ModalProps} />);
    const overlay = getByTestId("overlay");
    fireEvent.press(overlay);
    expect(toggleModalMock).toHaveBeenCalled();
  });
});
