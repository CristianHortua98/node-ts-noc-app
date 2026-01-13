import { Pool } from "pg";
import { LogDatasource } from "../../domain/datasources/log-datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { envs } from "../../config/plugins/envs.plugins";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, SeverityLevel } from "../../generated/client";


const pool = new Pool ({
    connectionString: envs.POSTGRES_URL
});
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({adapter});

const severtyEnum = {

    low: SeverityLevel.LOW,
    high: SeverityLevel.HIGH,
    medium: SeverityLevel.MEDIUM

}

export class PostgresLogDatasource implements LogDatasource{


    async saveLog(log: LogEntity): Promise<void> {

        const level = severtyEnum[log.level];
    
        const newLog = await prisma.logModel.create({
            data: {
                ...log,
                level: level
            }
        });

        console.log('Postgres Save');

    }


    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const level = severtyEnum[severityLevel];

        const logs = await prisma.logModel.findMany({
            where: {
                level: level
            }
        });

        return logs.map(postgresLog => LogEntity.fromObject(postgresLog));


    }



}