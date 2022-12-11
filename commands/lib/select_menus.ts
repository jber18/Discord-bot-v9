import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';

export class SelectMenu {
    customId: string;
    placeholder: string;
    options: any;


    constructor(customId: string, placeholder: string, options: any) {
        this.customId = customId;
        this.placeholder = placeholder;
        this.options = options;
    }


    public async selectMenu() {
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(this.customId)
                    .setPlaceholder(this.placeholder)
                    .addOptions(this.options),
            );
        return row;

    }

}
