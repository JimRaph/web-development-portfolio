import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose_connector from './db.js'
// import { startCronJob } from './cron/getCodeforceData.js';
import studentRouter from './routes/studentRoutes.js';
import seedStudentsFromRatedList from './utils/seedStudent.js';
import {syncAllStudentsContestHistory} from './utils/seedCfProfile.js';
import {syncAllStudentsSubmissions} from './utils/seedCfProblemStat.js';
import { seedSyncConfig } from './utils/seedSyncConfig.js';
import { startSyncCron } from './cron/syncJob.js';
import syncRouter from './routes/syncConfigRoutes.js';
import ServerlessHttp from 'serverless-http';

dotenv.config()

let server;

const start_server = async()=>{

  const app = express()
  app.use(cors({
      origin: process.env.CLIENT_URL
  }
  ))
  app.use(express.json())

  app.use('/api/students', studentRouter);
  app.use('/api', syncRouter)

  //connects to db
  await mongoose_connector();

  //seed database schemas

  // await seedStudentsFromRatedList()
  // await syncAllStudentsContestHistory()
  // await syncAllStudentsSubmissions()
  // console.log('calling seedSyncConfig');
  // await seedSyncConfig();
  console.log('calling startsynccron')
  // await startSyncCron();

  // startCronJob();

  if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
      
  return ServerlessHttp(app)

}

const handler = async(req, res) =>{
  if(!server){
    server = await start_server()
  }
  return server(req, res)
}

export default handler
