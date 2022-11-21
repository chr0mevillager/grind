import { CustomCommand } from "../exports/types";

import send from "./send";
import new_release from "./new_release";

/**A list of slash commands*/
const commands: Record<string, CustomCommand> = {
	send,
	new_release,
};

export default commands;