import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[];
}

export interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    async sendEmail(options: SendMailOptions): Promise<boolean>{

        const { to, subject, htmlBody, attachements = [] } = options;

        try{

            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            });

            // console.log(sentInformation);
            return true;

        }catch(error){

            return false;

        }


    }


    async sendEmailWithFileSystemLogs(to: string | string[]){

        const subject = 'Logs del servidor';
        const htmlBody = `
            <h2>Logs de Sistema - NOC</h2>
            <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.</p>
            <p>Ver logs adjuntos</p>
        `;

        const attachements: Attachement[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
        ];

        return this.sendEmail({
            to: to,
            subject: subject,
            htmlBody: htmlBody,
            attachements: attachements
        });

    }


}