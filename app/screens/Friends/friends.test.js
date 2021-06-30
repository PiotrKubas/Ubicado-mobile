/* eslint-disable prettier/prettier */

import { render, screen } from "test-utils";
import { FriendsScreen } from ".";

describe("Search Bar", () => {
    it("Renders the component", () => {
        render(<FriendsScreen />);
        screen.getByText("Add friend");
        screen.getByPlaceholderText("Search");
    });
});
