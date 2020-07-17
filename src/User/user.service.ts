import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
const jwt = require('jsonwebtoken');
import { Bcrypt } from 'bcrypt'
import { EINVAL } from 'constants';
import { ResumeToken } from 'mongodb';
 @Injectable()
export class UserService {
    
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

  
    async registerUser(name:string,email:string,password:string)
    {
      let user1=await this.userModel.findOne({email:email});
         if(user1)
         {
          const errors = {username: 'Username and email must be unique.'};
          throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST); 
         }
      
            let user=new this.userModel();
            user.name=name;
            user.email=email;
            user.password=password;
            let result=user.save();
            //create a jwt object and return it
            return this.generateJWT(user);
          

      
    }

    async loginUser(email:string,password:string)
    {
          let user=await this.userModel.findOne({email:email});

          const errors = {User: ' not found'};
          if (!user) throw new HttpException({errors}, 401);
          if(user.password===password)
          {
            return this.generateJWT(user);
          }
          
          return {"Status":"Failed to loin"};

    }

    async resetPassword(email:string,oldpassword:string,newpassword:string)
    {
      //jwt auth
      let user=await this.userModel.findOne({email:email});
      if(user.password===oldpassword)
      {
        user.password=newpassword;
        user.save();
        return this.generateJWT(user);
      }
      return {"status":"wrong Password, cannot reset password"};

      

    }

    async findById(id:string)
    {
      let user=await this.userModel.findById(id);
       return this.generateJWT(user);

    }


    public generateJWT(user) {
      let today = new Date();
      let exp = new Date(today);
      exp.setDate(today.getDate() + 60);
  
      return jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        exp: exp.getTime() / 1000,
      }, 'New-Sec' );
    };
  
    private buildUserRO(user: User) {
      const userRO = {
        id: user.id,
        name: user.name,
        email: user.email,
        token: this.generateJWT(user),
      };
  
      return {user: userRO};
  }

  
}
