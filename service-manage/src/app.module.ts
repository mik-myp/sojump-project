import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongodbDbName, mongodbUrl } from 'config';

@Module({
  imports: [
    MongooseModule.forRoot(mongodbUrl, {
      dbName: mongodbDbName,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
