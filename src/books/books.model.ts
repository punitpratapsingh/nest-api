import * as Mongoose from 'mongoose';


export const BooksSchema=new Mongoose.Schema({

    title: {
        type: String,
        required:true
    },
    photo: {
        type:String,
        required :true
    },
    description :{
        type: String,
        required :true
    },

});

export interface Book extends Mongoose.Document
{

    id :string;
    title : string;
    photo : string;
    description :string;


}