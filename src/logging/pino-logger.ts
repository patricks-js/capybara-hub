import { LoggerService } from '@nestjs/common';
import pino from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({
  colorize: true,
  translateTime: 'SYS:standard',
  ignore: 'pid,hostname',
  messageFormat: '{req.method} {req.url} {res.statusCode} {req.headers.content-type} {req.headers.user-agent} {req.headers.host} {req.headers.connection} {remoteAddress} {remotePort} {responseTime}ms',
});

const logger = pino({
  level: 'debug',
}, stream);

export class PinoLoggerService implements LoggerService {
  log(message: string) {
    logger.info(message);
  }
  error(message: string, trace: string) {
    logger.error(message, trace);
  }
  warn(message: string) {
    logger.warn(message);
  }
  debug(message: string) {
    logger.debug(message);
  }
  verbose(message: string) {
    logger.trace(message);
  }
}
