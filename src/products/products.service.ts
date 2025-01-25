import {
  BadRequestException,
  Headers,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      name: 'rdze',
      price: 100,
      category: 'dairy',
      createdAt: new Date().toString(),
    },
    {
      id: 2,
      name: 'mawoni',
      price: 300,
      category: 'dairy',
      createdAt: new Date().toString(),
    },
    {
      id: 2,
      name: 'arajani',
      price: 400,
      category: 'dairy',
      createdAt: new Date().toString(),
    },
    {
      id: 3,
      name: 'pizza',
      price: 400,
      category: 'food',
      createdAt: new Date().toString(),
    },
  ];

  create(createProductDto: CreateProductDto) {
    const { name, price, category } = createProductDto;

    if (!name || !price || !category) {
      throw new HttpException(
        'All fields are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProduct = {
      id: this.products.length + 1,
      name,
      price,
      category,
      createdAt: new Date().toISOString(),
    };

    this.products.push(newProduct);
    return newProduct;
  }

  findAll(query) {
    const { lang } = query;

    const { category, price } = query;

    if (category && price) {
      const categoryFilterData = this.products.filter(
        (el) => el.category === category,
      );

      const priceFilterData = categoryFilterData.filter(
        (el) => el.price >= +price,
      );

      return priceFilterData;
    }

    if (category) {
      return this.products.filter((el) => el.category === category);
    }

    if (price) {
      return this.products.filter((el) => el.price >= +price);
    }

    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((el) => el.id === id);
    if (!product) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productsIndex = this.products.findIndex((el) => el.id === id);
    if (productsIndex === -1) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }

    const updatedExpense = {
      ...this.products[productsIndex],
      ...updateProductDto,
    };

    this.products[productsIndex] = updatedExpense;
    return updatedExpense;
  }

  remove(id: number) {
    const index = this.products.findIndex((el) => el.id === id);
    if (index === -1) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }

    const deletedExpense = this.products.splice(index, 1);
    return deletedExpense;
  }
}
