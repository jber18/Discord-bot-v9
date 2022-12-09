import { Client, Intents, Collection, MessageEmbed } from 'discord.js';

export class MessageCard {
    author: string;
    authorIcon?: string;
    title: string;
    description: string;
    image?: string;
    thumbnail: string;
    footer: string;
    footerIcon?:string;

    constructor(cardAuthor: string,cardTitle: string, cardDescription: string,cardFooter: string,cardThumbnail: string,
        cardImage?: string, cardAuthorIcon?: string, cardFooterIcon?:string) {

        this.author = cardAuthor;
        this.authorIcon = cardAuthorIcon;
        this.title = cardTitle;
        this.description = cardDescription;
        this.image = cardImage;
        this.thumbnail = cardThumbnail;
        this.footer = cardFooter;
        this.footerIcon = cardFooterIcon;

    }

    //Use for Greetings
    public async messageCardGreetings(){

        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor({ name : this.author, iconURL: this.authorIcon || undefined})
        .setTitle(this.title)
        .setDescription(this.description)
        .setImage(this.image || "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png")
        .setFooter({text: this.footer, iconURL: this.footerIcon})
        .setTimestamp()

        return embed;
    }

    //Use for Messages
    public async messageCardMsgs(){

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor({ name : this.author, iconURL: this.authorIcon})
        .setTitle(this.title)
        .setThumbnail(this.thumbnail)
        .setDescription(this.description)
        .setFooter({text: this.footer, iconURL: this.footerIcon})
        .setTimestamp()

        return embed;
    }
}