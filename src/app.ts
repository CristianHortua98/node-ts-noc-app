import 'dotenv/config';
import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugins';
import { LogModel, MongoDataBase } from './data/mongo';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/client';
import { Pool } from 'pg';

(async () => {

    main();

})();

async function main(){

    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    // const pool = new Pool ({
    //     connectionString: envs.POSTGRES_URL
    // });
    // const adapter = new PrismaPg(pool)
    // const prisma = new PrismaClient({adapter});

    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'App.ts'
    //     }
    // });

    // const logs = await prisma.logModel.findMany();

    // console.log(logs);

    //Crear una coleccion = tables, documento = registro
    // const newLog = await LogModel.create({
    //     message: `Test message desde Mongo`,
    //     origin: 'App.ts',
    //     level: 'low'
    // });

    // await newLog.save();
    // console.log(newLog);

    // const logs = await LogModel.find();
    // console.log(logs);

    Server.start();
    // console.log(envs);
}