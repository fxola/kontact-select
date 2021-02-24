import "react-native";
import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react-native";
import { expect, it } from "@jest/globals";
import ContactItem from "./index";

describe("When the ContactItem Component renders", () => {
  afterEach(cleanup);
  const onPressMock = jest.fn();
  const Props = {
    item: {
      image: undefined,
      name: "Sam ",
      label: "home",
      number: "08067734477634",
      id: "10jdhfj8"
    },
    handleContactSelect: onPressMock
  };

  it("renders the ContactItem Component Correctly", async () => {
    const { getByTestId } = render(<ContactItem {...Props} />);

    const detail = getByTestId("user-detail");
    const number = getByTestId("user-number");
    const image = getByTestId("image");

    expect(detail.children[0]).toBe("Sam   (home)");
    expect(number.children[0]).toBe("08067734477634");
    expect(image.props.source.testUri).toBe("../../../assets/favicon.png");
  });

  it("Fires the handleContactSelect Function  Correctly", async () => {
    const { getByTestId } = render(<ContactItem {...Props} />);
    const contactItem = getByTestId("contact");
    fireEvent.press(contactItem);
    expect(onPressMock).toHaveBeenCalledWith("08067734477634");
  });
});
