# Availability Notifier
A Node app that crawls a website looking for an element and sends a notification to a slack channel if it no longer exists.

## Prerequisites

- Node 8.13.0+
- Yarn 1.20.0+
- A Firebase Project
- A Slack App using webhooks

## Local setup
```
# copy environment variables
cp .env.dev .env

# install dependencies
yarn

# link package
yarn link

# run cli command
check-availability 'URL' 'ELEMENT SELECTOR'
```