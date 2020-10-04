const CronJob = require('cron').CronJob;
 const exec = require('child_process').exec;
import { mongodbUri } from "../server/common/config";

// AutoBackUp every week (at 00:00 on Sunday)

new CronJob(
  '0 0 * * 0',
  function() {
  console.log('Backup Initiated');

    let exportParams =
      `mongodump --uri="` +
      mongodbUri+`"`;

    const mongoDump = exec(exportParams, (error, stdout, stderr) => {

        if (error) {
            console.log(error.stack);
            console.log('Child MONGO Error code: ' + error.code);
            console.log('Child MONGO Signal received: ' + error.signal);
        }
        console.log('Child MONGO Process STDOUT: ' + stdout);
        console.log('Child MONGO Process STDERR: ' + stderr);
    });

    mongoDump.on('exit', (code) => {
        console.log('MONGO Child process exited with exit code ' + code);
    });

  },
  null,
  true,
  'America/New_York'
);
