import { CustomCommand } from "../exports/types";

import test from "./test";

/**A list of slash commands*/
const commands: Record<string, CustomCommand> = {
	test,
};

export default commands;