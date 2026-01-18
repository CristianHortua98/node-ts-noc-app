import { EmailService, SendMailOptions } from "./email.service";
import nodemailer from 'nodemailer';


describe('EmailService', () => {

    const mockSendMail = jest.fn();

    //Mock al createTransport
    // nodemailer.createTransport = jest.fn().mockReturnValue({
    //     sendMail: mockSendMail
    // })
    const emailService = new EmailService();
    
    test('should send email', async () => {
      

        const options : SendMailOptions = {
            to: 'alejo.hortua3@gmail.com',
            subject: 'Test',
            htmlBody: '<h1>Test</h1>'
        }

        const emailSent = await emailService.sendEmail(options);

        expect(emailSent).toBe(true);

        // expect(mockSendMail).toHaveBeenCalledWith({})

    })

    test('should send email with attachments', async () => {
      
        const emailSent = await emailService.sendEmailWithFileSystemLogs('alejo.hortua3@gmail.com');

        expect(emailSent).toBe(true);

    })
    
    

});