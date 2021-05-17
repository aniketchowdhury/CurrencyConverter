import App from "../App";
import {render,fireEvent} from "@testing-library/react";

describe("test Suite for Currency Conversion",()=>{
    it("App snapshot", () => {
        const { asFragment } = render(<App />);
    
        expect(asFragment()).toMatchSnapshot();
      });

    it("give all inputs",()=>{
        const { getByTestId }=render(<App />)
        fireEvent.change(getByTestId("money1"), {
            target: { value: "100" }
          });
          expect(getByTestId("money1")).toBeDefined();
          expect(getByTestId("money2")).toBeDefined();
          expect(getByTestId("convert")).toBeDefined();
    })  
})
