import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { YambleService } from './yamble.service';
import { CreateYambleDto } from './dto/create-yamble.dto';
import { UpdateYambleDto } from './dto/update-yamble.dto';

@Controller('yamble')
export class YambleController {
  constructor(private readonly yambleService: YambleService) {}

  @Post()
  create(@Body() createYambleDto: CreateYambleDto) {
    return this.yambleService.create(createYambleDto);
  }

  @Get()
  findAll() {
    return this.yambleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.yambleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateYambleDto: UpdateYambleDto) {
    return this.yambleService.update(+id, updateYambleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yambleService.remove(+id);
  }
}
