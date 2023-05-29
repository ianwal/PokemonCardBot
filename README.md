<div align="center">
	<video src="https://github.com/ianwal/PokemonCardBot/assets/52143079/d8558656-3420-496c-aed5-83862dd3210a"/>
</div>


Discord bot that simulates opening a Pokemon card pack

# Installation

1. Clone or download this repository
2. Install dependencies

```sh
npm ci
```

3. Create `config.json` in this directory and add your Discord bot keys from their developer portal

`config.json`
```json
{
    "token": "<your bot token>",
    "clientId": "<your bot application ID>"
}
```

4. Run the bot

```sh
node index.js
```

5. Invite the bot to your server. It requires applications.commands permission.

Note:
- It may take up to an hour for slash commands to show up. This is a limitation of Discord.

</br>

# Development

When changing commands, it may be useful to reduce the time it takes for them to show up on Discord.

To reduce this time, you can specify a single guild (discord server) where you want to test the bot.

Add the ID of your guild to config.json. To find this, right click your Discord server and click `Copy Server ID`.

`config.json`
```json
{
    "token": "<your bot token>",
    "clientId": "<your bot application ID>",
    "guildId": "<your guild ID>"
}
```

And then in deploy-commands.js uncomment the top line in the guild commands request and comment the bottom line so it looks like the following:

```js
const data = await rest.put(
    Routes.applicationGuildCommands(clientId, guildId),
    //Routes.applicationCommands(clientId),
    {body: commands},
);
```

Now run deploy-commands again with `node deploy-commands.js` and it should deploy the commands to that one server quickly.

You can then modify and run the program normally.

</br>

# Credits
[Pokemon JSON Packs](https://github.com/PokemonTCG/pokemon-tcg-data) by PokemonTCG on GitHub

</br>
This project is not produced, endorsed, supported, or affiliated with Nintendo or The Pokémon Company.
