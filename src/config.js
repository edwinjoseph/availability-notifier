module.exports = class Config {
  constructor(env = {}) {
    return {
      fb: {
        database: env.FB_DATABASE_URL,
        credentials: {
          type: 'service_account',
          project_id: env.FB_PROJECT_ID,
          private_key_id: env.FB_PRIVATE_ID,
          private_key: env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
          client_email: env.FB_CLIENT_EMAIL,
          client_id: env.FB_CLIENT_ID,
          client_x509_cert_url: env.FB_CLIENT_CERT_URL,
          auth_uri: 'https://accounts.google.com/o/oauth2/auth',
          token_uri: 'https://oauth2.googleapis.com/token',
          auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        }
      },
      slack: {
        webhook: env.SLACK_WEBHOOK,
      },
    };
  }
}