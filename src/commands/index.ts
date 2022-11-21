import { CustomCommand } from "../exports/types";

import send from "./send";
import new_release from "./new_release";
import dev_toolkit_entry from "./dev_toolkit_entry";

/**A list of slash commands*/
const commands: Record<string, CustomCommand> = {
	send,
	new_release,
	dev_toolkit_entry,
};

export default commands;