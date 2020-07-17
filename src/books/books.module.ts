import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { AuthMiddleware } from '../User/auth.middleware'
import { UserService } from '../User/user.service'
import { BooksSchema } from './books.model'
import { from } from 'rxjs';
import { UserModule } from 'src/User/user.module';
@Module({
  imports: [MongooseModule.forFeature([{name:'Books',schema:BooksSchema}]),UserModule],
/* imports: [
    MongooseModule.forRoot('mongodb://localhost/School-app', { useNewUrlParser: true }),
],*/
  controllers: [BooksController],
  providers: [BooksService],
  
})
export class BooksModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: 'books/prv', method: RequestMethod.GET});
  }
} {}
