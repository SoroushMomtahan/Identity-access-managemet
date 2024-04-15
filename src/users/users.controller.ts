import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
import { FindUserDto } from "./dto/find-user.dto";
import { Roles } from "../common/decorator/roles.decorator";
import { Role } from "../common/enum/role.enum";
@Roles(Role.ADMIN)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService:UsersService
  ) {
  }
  @Post()
  public create(@Body() createUserDto:CreateUserDto){
    return this.usersService.create(createUserDto)
  }
  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id:number){
    return this.usersService.findOne(id);
  }

  @Get()
  public findAllBy(@Query() findUserDto:FindUserDto){
    return this.usersService.findAllBy(findUserDto);
  }


  @Patch(':id')
  public updateOne(@Param('id', ParseIntPipe) id:number, @Body() updateUserDto:UpdateUserDto){
    return this.usersService.updateOne(id, updateUserDto)
  }
  @Delete(':id')
  public removeOne(@Param('id', ParseIntPipe) id:number){
    return this.usersService.removeOne(id);
  }

}