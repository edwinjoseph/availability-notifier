require('dotenv').config();

const Crawler = require("crawler");
const admin = require("firebase-admin");
const hash = require("short-hash")

const Config = require('./config');
const sendNotification = require("./send-notification");

module.exports = (url, elementQuery) => {
  const config = new Config(process.env);

  const firebase = admin.initializeApp({
    credential: admin.credential.cert(config.fb.credentials),
    databaseURL: config.fb.database,
  });

  const db = firebase.firestore();
  const collection = db.collection('websites');

  const crawl = new Crawler({
    maxConnections: 1,  
  })

  crawl.queue({
    uri: url,
    callback: async (err, res, done) => {
      if (err || res.statusCode !== 200) {
        throw new Error(`Unable to load url: "${url}"`);
      }

      const el = res.$(elementQuery);
      const elExists = el.length > 0;
      
      if (!elExists) {
        const hashed = hash(`${url}:${elementQuery}`);
        const document = collection.doc(hashed);
        const res = await collection.doc(hashed).get();
        if (!res.exists) {
          sendNotification(url, { webhook: config.slack.webhook });
          document.set({ url, elementQuery, notified: true });
        }
        console.log('notification already sent');
        return done();
      }

      console.log('item not ready yet');
      return done();
    }
  })

  crawl.on('drain', function() {
    firebase.delete();
  });
}