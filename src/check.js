require('dotenv').config();

const Crawler = require("crawler");
const admin = require("firebase-admin");
const hash = require("short-hash")

const Config = require('./config');
const sendNotification = require("./send-notification");

const elementExists = (url, elementQuery, config) => {
  const crawl = new Crawler({
    maxConnections: 1,  
  })

  return new Promise((resolve, reject) => {
    crawl.queue({
      uri: url,
      callback: async (err, res, done) => {
        if (err || res.statusCode !== 200) {
          sendNotification(`*Check availability failed*\nPage crawling failed on: ${url}`, config);
          reject(err)
          return done();
        }

        const el = res.$(elementQuery);
        const exists = el.length > 0;
        
        resolve(exists)
        done()
      }
    });
  })
}

const notificationSent = async (document) => {
  const { exists } = await document.get();
  return exists;
}

module.exports = async (url, elementQuery) => {
  const config = new Config(process.env);

  const firebase = admin.initializeApp({
    credential: admin.credential.cert(config.fb.credentials),
    databaseURL: config.fb.database,
  });

  const db = firebase.firestore();
  const collection = db.collection('websites');

  try {
    if (await elementExists(url, elementQuery, config))
      return console.log('item not ready yet');

    const hashed = hash(`${url}:${elementQuery}`);
    const document = collection.doc(hashed);

    if (await notificationSent(document))
      return console.log('notification already sent');
    
    sendNotification(`You are now able to purchase your item: ${url}`, config);
    document.set({ url, elementQuery, notified: true });
  } catch (err) {
    console.error(err);
  } finally {
    firebase.delete();
  }
}