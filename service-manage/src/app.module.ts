import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongodbDbName, mongodbUrl } from 'config';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongodbUrl, {
      dbName: mongodbDbName,
    }),
    UserModule,
    QuestionnaireModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
