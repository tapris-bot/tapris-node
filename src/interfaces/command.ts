import Client from "#core/index.js";
import {
  ApplicationCommandOption,
  ChatInputCommandInteraction,
  InteractionResponse,
  Message
} from "discord.js";

interface Run {
  (
    client: Client,
    interaction: ChatInputCommandInteraction
  ): Promise<Message<boolean> | InteractionResponse<boolean>>;
}

type ApplicationCommandOptionExtended = ApplicationCommandOption & {
  required: boolean;
};

export interface Command {
  name: string;
  description?: string;
  options?: ApplicationCommandOptionExtended[];
  guildsOnly?: boolean;
  disabled?: boolean;
  run: Run;
}
