import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { PositiveIntPipe } from '../common/pipes/positiveInt.pipe';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  getAllCat() {
    // throw new ForbiddenException();
    console.log('getAllCat()');
    return { cats: 'all cat' };
  }

  @Get(':id')
  getOneCat(
    @Param() param,
    @Param('id', ParseIntPipe, PositiveIntPipe) id: number,
  ) {
    console.log(param);
    console.log(id);
    console.log(typeof id);
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update partial cat';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}
