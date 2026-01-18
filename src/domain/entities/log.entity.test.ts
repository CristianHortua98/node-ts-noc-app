import { LogEntity, LogSeverityLevel } from "./log.entity"


describe('LogEntity', () => {

    const dataObj = {
        message: 'Hola Mundo',
        level: LogSeverityLevel.high,
        origin: 'log.entity.test.ts'
    };

    test('should create a LogEntity instance', () => {

        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);

    });


    test('should create a LogEntity instance from JSON', () => {

        const json = `{"message":"https://googlefdsf.com is not ok. TypeError: fetch failed","level":"high","createdAt":"2026-01-14T02:43:50.234Z","origin":"check-service.ts"}`;

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("https://googlefdsf.com is not ok. TypeError: fetch failed");
        expect(log.level).toBe(LogSeverityLevel.high);
        expect(log.origin).toBe("check-service.ts");
        expect(log.createdAt).toBeInstanceOf(Date);

    });

    test('should create a LogEntity instace from Object', () => {

        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);

    })

})