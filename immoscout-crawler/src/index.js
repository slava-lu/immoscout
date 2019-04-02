const CronJob = require('cron').CronJob;

const apartmentCrawler = require('./crawler/apartmentCrawler');
const connection = require('./db/dbInit');
const { cronSchedule } = require('./config/config');

const run = async () => {
  console.log('job started', new Date());

  try {
    await connection.createConnection();
    await apartmentCrawler();
  } catch (e) {
    console.log('Error Starting Connection', e);
  }

  try {
    await connection.closeConnection();
  } catch (e) {
    console.log('Error Closing Connection', e);
  }

  console.log('job finished', new Date());
};

// Crawling Scheduling
const stub = () => {
  console.log('No operation', new Date())
};

let job;
if (cronSchedule) {
  job = new CronJob(cronSchedule, run);
} else {
  // To keep docker container alive
  console.log('No schedule information found');
  job = new CronJob('0 0 * * *', stub);
}

job.start();





