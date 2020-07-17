import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

 @Post('signUp')
 async signUp(@Body('name') name:string,@Body('email') email:string,@Body('password') password:string){

  let result= await this.UserService.registerUser(name,email,password);
   return result;
 }

 @Post('signIn')
async signIn(@Body('email') email:string,@Body('password') password:string)
{
let result= await this.UserService.loginUser(email,password);
return result;

}
@Put(':email/reset_password')
async resetPassword(@Param('email') email:string,@Body('old_password') oldPass:string,@Body('new_password') newPass:string)
{
  let result=this.UserService.resetPassword(email,oldPass,newPass);
  return result;
}
}
