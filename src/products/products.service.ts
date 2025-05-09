import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-input.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
      private productRepository: Repository<Product>,
    ) {}

	// Create
    async create(input: CreateProductInput): Promise<Product> {
        const product = this.productRepository.create(input);
        return this.productRepository.save(product);
    }

	// Read All
    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

	// Read One
	async findOne(id: number): Promise<Product> {
	  const product = await this.productRepository.findOneBy({ id });
	  if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
	  return product;
	}

	// Update
	async update(id: number, input: UpdateProductInput): Promise<Product> {
	  const product = await this.findOne(id);
	  const updated = Object.assign(product, input);
	  return this.productRepository.save(updated);
	}

	// Delete
	async remove(id: number): Promise<boolean> {
	  const result = await this.productRepository.delete(id);
	  if (result.affected === 0) {
		throw new NotFoundException(`Product with ID ${id} not found`);
	  }

	  return true;
	}
}
