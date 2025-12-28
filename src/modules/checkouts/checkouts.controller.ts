import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CheckoutsService } from './checkouts.service';
import {
  CheckoutBaseSchema,
  CreateCheckoutDto,
} from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { randomUUID as generateUUID } from 'node:crypto';
import { writeFileSync, mkdirSync, existsSync } from 'fs';


@Controller('checkouts')
export class CheckoutsController {
  constructor(private readonly checkoutsService: CheckoutsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody(CheckoutBaseSchema)
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCheckoutDto: CreateCheckoutDto,
  ) {
    this.handleFileUpload(file);

    if (typeof createCheckoutDto.isSpoiler === 'string') {
      createCheckoutDto.isSpoiler = createCheckoutDto.isSpoiler === 'true';
    }

    return this.checkoutsService.create(createCheckoutDto);
  }

  @Get()
  findAll() {
    return this.checkoutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkoutsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCheckoutDto: UpdateCheckoutDto,
  ) {
    return this.checkoutsService.update(id, updateCheckoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkoutsService.remove(id);
  }

  handleFileUpload(file: Express.Multer.File): string {
    if (!file) {
      return '';
    }

    const uploadDir = './checkout';
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir);
    }

    const uniqueFileName = `${generateUUID()}-${file.originalname}`;
    const filePath = `${uploadDir}/${uniqueFileName}`;
    writeFileSync(filePath, file.buffer);

    return uniqueFileName;
  }
}
