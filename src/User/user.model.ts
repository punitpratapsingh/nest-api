import * as Mongoose from 'mongoose';

export const UserSchema=new Mongoose.Schema({

    name: {
        type: String,
        required:true
    },
    email: {
        type:String,
        required :true,
        unique : true
    },
    password :{
        type: String,
        required :true
    }

});

export interface User extends Mongoose.Document
{

    id :string;
    name : string;
    email : string;
    password :string;


}