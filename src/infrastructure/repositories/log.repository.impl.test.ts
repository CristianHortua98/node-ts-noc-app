import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";


describe('LogRepositoryImpl', () => {

    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const logRepository = new LogRepositoryImpl(mockLogDatasource);

    beforeEach(() => {
        jest.clearAllMocks();
    })
    
    test('saveLog should call the datasource with arguments', async () => {

        const log = new LogEntity({
            message: 'test-message',
            level: LogSeverityLevel.low,
            origin: 'log.repository.impl.test.ts'
        });
      
        await logRepository.saveLog(log);
        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);

    })


    test('getLogs should call the datasource with arguments', async () => {
      
        await logRepository.getLogs(LogSeverityLevel.low);
        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);

    })
    
    

});