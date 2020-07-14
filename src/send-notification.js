const { IncomingWebhook } = require('@slack/webhook');

module.exports = async (url, config) => {
  const webhook = new IncomingWebhook(config.webhook);
  
  console.log('sending notification to slack');
  await webhook.send({ text: `You are now able to purchase your item: ${url}` });
}