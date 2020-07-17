import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book } from './books.model';

 @Injectable()
export class BooksService {
constructor(@InjectModel('Books') private readonly bookModel: Model<Book>) { }
   
//constructor( @InjectModel('Books') private readonly booksService: BooksService) {}

async getBooks(){
     
    let result= await this.bookModel.find().exec();;
    return result;
   
  }

 async addBook(title: string, image :string, description :string)
  {
      const book= new this.bookModel();
      book.title=title;
      book.photo=image;
      book.description=description;
      let Result=await book.save();
    return Result;
  }
 async findBook(id :string)
  {
    let book;
    try{
      book=await this.bookModel.findById(id);
    }catch(err)
    {
      throw new NotFoundException(" Book not Found ");
    }

    if(!book)
    {
      throw new NotFoundException(" Book not Found ");
      
    }
      return book;
  }

 async updateBook(id: string,title:string,photo:string,description:string)
  {
    let book=await this.bookModel.findById(id);
      if(title)
      {
         book.title=title;
      }
      if(photo)
      {
        book.photo=photo;
      }
      if(description)
      {
        book.description=description;
      }
      book.save()
      return "updated";
  }

 async deleteBook(id: string)
  {
    await this.bookModel.deleteOne({_id:id});
    return "deleted";
  }
}
