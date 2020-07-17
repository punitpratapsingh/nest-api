import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BooksModule } from './books/books.module'
import { UserModule } from './User/user.module';

 

@Module({
  imports: [BooksModule,UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://rahul_bot1:Rahulsingh@8@cluster0-dzbde.mongodb.net/schooldb?retryWrites=true&w=majority',
    ),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
