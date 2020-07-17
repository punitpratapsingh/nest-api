import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.model';
import { AuthGuard } from '@nestjs/passport';
import {AuthMiddleware} from '../User/auth.middleware'
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks() {
     let result= await this.booksService.getBooks();
    return result;
  }
 // @UseGuards(AuthGuard('jwt'))
  @Get('prv')
async getBooksAuth()
{
  let result= await this.booksService.getBooks();
  return result;
}



 @Post()
  async addBook(@Body('title') bookTitle :string ,@Body('photo') bookPhoto :string ,@Body('description') bookDesc :string )
 {
    
     let result= await this.booksService.addBook(bookTitle,bookPhoto,bookDesc);
     return result;
 }
 @Get(':id')
 async findBook(@Param('id') bookid:string)
 {
let result=await this.booksService.findBook(bookid);
return result;

 }
 @Patch(':id')
async updateBook(@Param('id') bookId:string,@Body('title') bookTitle:string,@Body('photo') bookPhoto:string,@Body('description') bookDesc:string)
{
  let result=await this.booksService.updateBook(bookId,bookTitle,bookPhoto,bookDesc);
return result;
}
@Delete(':id')
async deleteBook(@Param('id') bookid:string)
{
  let result=await this.booksService.deleteBook(bookid);
  return result;
}

}
