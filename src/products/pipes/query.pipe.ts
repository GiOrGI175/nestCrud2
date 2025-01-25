import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class QueryParamsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { category, price } = value;

    if (!category || !price) {
      return value;
    }

    const categoryes = ['shopping', 'food', 'drink', 'sport', 'dairy'];
    if (!categoryes.includes(category))
      throw new BadRequestException('wrong category');

    if (isNaN(Number(price)) || price < 0)
      throw new BadRequestException('price is only numbers and  more then 0');

    return value;
  }
}
