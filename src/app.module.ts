import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './config';
import { CoffeesModule } from './modules/coffees/coffees.module';
import { UsersModule } from './modules/users/users.module';
import { IamModule } from './modules/iam/iam.module';
import { AuthenticationController } from './iam/authentication/authentication.controller';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                autoLoadEntities: true,
                synchronize: true
            })
        }),
        ConfigModule.forRoot({
            load: [AppConfig]
        }),
        CoffeesModule,
        UsersModule,
        IamModule
    ],
    controllers: [AppController, AuthenticationController],
    providers: [AppService]
})
export class AppModule {}
