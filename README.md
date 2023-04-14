# Ranking Board Helper

[![main](https://github.com/Louis-7/ranking-board-helper/actions/workflows/main.yml/badge.svg)](https://github.com/Louis-7/ranking-board-helper/actions/workflows/main.yml)

Ranking Board Helper is a GitHub bot for [Ranking Board](https://github.com/Louis-7/ranking-board). It can listen to issue comments and update the Ranking Board data file. This project is deployed to Glitch with a free tier account and may not be awake all the time. However, you are welcome to fork this repository and host it yourself.

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t protagonist-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> protagonist-bot
```

## License

[GPL 3.0](LICENSE) © 2023 Louis Liu
