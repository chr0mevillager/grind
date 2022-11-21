import { CustomCommand } from "../exports/types";

import send from "./send";

/**A list of slash commands*/
const commands: Record<string, CustomCommand> = {
	send,
};

export default commands;