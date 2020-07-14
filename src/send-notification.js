const { IncomingWebhook } = require('@slack/webhook');

module.exports = async (text, config) => {
  const webhook = new IncomingWebhook(config.slack.webhook);
  console.log('sending notification to slack');
  await webhook.send({ text });
}