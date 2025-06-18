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

dotenv.config()

const app = express()
app.use(cors({
    origin: 'http://localhost:5173'
}
))
app.use(express.json())

app.use('/api/students', studentRouter);
app.use('/api', syncRouter)

async function startServer(){
    try {
    //connects to db
    await mongoose_connector();

    //seed database schemas
    
    // await seedStudentsFromRatedList()
    await syncAllStudentsContestHistory()
    // await syncAllStudentsSubmissions()
    console.log('calling seedSyncConfig');
    await seedSyncConfig();
    console.log('calling startsynccron')
    await startSyncCron();

    const PORT = process.env.PORT || 3001;


    // startCronJob();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
    } catch (error) {
        console.error("Error during server startup: ", error)
    }
}

startServer()