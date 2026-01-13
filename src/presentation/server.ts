import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepository } from '../domain/repository/log.repository';
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugins";
import { EmailService } from './email/email.service';
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fslogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
    // new MongoLogDatasource(),
    // new PostgresLogDatasource(),
);
const mongologRepository = new LogRepositoryImpl(
    // new FileSystemDatasource()
    new MongoLogDatasource(),
    // new PostgresLogDatasource(),
);
const postgreslogRepository = new LogRepositoryImpl(
    // new FileSystemDatasource()
    // new MongoLogDatasource(),
    new PostgresLogDatasource(),
);
const emailService = new EmailService();

export class Server {

    static async start(){
        console.log('Server started...');

        // new SendEmailLogs(emailService, fileSystemLogRepository).execute(['alejo.hortua3@gmail.com','alejo.hortua@hotmail.com']);

        // const emailService = new EmailService(fileSystemLogRepository);
        // emailService.sendEmailWithFileSystemLogs(['alejo.hortua3@gmail.com','alejo.hortua@hotmail.com']);
        // emailService.sendEmail({
        //     to: 'alejo.hortua@hotmail.com',
        //     subject: 'Logs Sistema',
        //     htmlBody: `
        //         <h2>Logs de Sistema - NOC</h2>
        //         <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.</p>
        //         <p>Ver logs adjuntos</p>
        //     `
        // });

        // const logs = await logRepository.getLogs(LogSeverityLevel.high);
        // console.log(logs)

        CronService.createJob(
            '*/5 * * * * *',
            () => {

                const url = `https://googlefdsf.com`;

                new CheckServiceMultiple(
                    [fslogRepository, mongologRepository, postgreslogRepository],
                    () => console.log(`${url} is ok.`),
                    (error) => console.log(error)
                ).execute(`${url}`);
                // new CheckService().execute(`http://localhost:3000/`);
            }
        );

    }


}