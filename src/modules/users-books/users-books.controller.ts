import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersBooksService } from './users-books.service';
import { CreateUsersBookDto } from './dto/create-users-book.dto';
import { UpdateUsersBookDto } from './dto/update-users-book.dto';

@Controller('users-books')
export class UsersBooksController {
  constructor(private readonly usersBooksService: UsersBooksService) {}

  @Post()
  create(@Body() createUsersBookDto: CreateUsersBookDto) {
    return this.usersBooksService.create(createUsersBookDto);
  }

  @Get()
  findAll() {
    return this.usersBooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersBooksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersBookDto: UpdateUsersBookDto) {
    return this.usersBooksService.update(id, updateUsersBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersBooksService.remove(id);
  }
}
