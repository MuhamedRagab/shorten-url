import { ConfigModuleOptions } from '@nestjs/config';

export const configModule: ConfigModuleOptions = {
  envFilePath: ['.env', '.env.development'],
  isGlobal: true,
  cache: true,
};
