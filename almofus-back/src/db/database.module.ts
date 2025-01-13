import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1234*',
        database: 'almofus',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

@Module({
  providers: databaseProviders,
  exports: databaseProviders,
})
export class DatabaseModule {}
