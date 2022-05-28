import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencyForm from "./CurrencyForm";

describe("Component CurrencyForm", () => {
  it("should render without crashing", () => {
    render(<CurrencyForm action={() => {}} />);
  });
  it("should run action callback with proper data on form submit", () => {
    const action = jest.fn();

    //render component
    render(<CurrencyForm action={action} />);

    //find "convert" button
    const submitButton = screen.getByText("Convert");

    //find field elems
    const amountField = screen.getByTestId("amount");
    const formField = screen.getByTestId("form-select");
    const toField = screen.getByTestId("to-select");

    //set test values to fields
    userEvent.type(amountField, "100");
    userEvent.selectOptions(formField, "PLN");
    userEvent.selectOptions(toField, "USD");

    //simulate user click on "convert" button
    userEvent.click(submitButton);

    //check if action callback was called once and with proper argument
    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith({
      amount: 100,
      from: "PLN",
      to: "USD",
    });
  });
});
