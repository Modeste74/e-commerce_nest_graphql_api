import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-input.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductsResolver {
    constructor(private readonly productsService: ProductsService) {}

    // Read all
    @Query(() => [Product])
    products() {
        return this.productsService.findAll();
    }

    // Create
    @Mutation(() => Product)
    createProduct(@Args('input') input: CreateProductInput) {
        return this.productsService.create(input);
    }

    // Read One
    @Query(() => Product)
    product(@Args('id', { type: () => Int }) id: number): Promise<Product> {
      return this.productsService.findOne(id);
    }

    // Update
    @Mutation(() => Product)
    updateProduct(
      @Args('id', { type: () =>Int }) id: number,
      @Args('input') input: UpdateProductInput,
    ): Promise<Product> {
      return this.productsService.update(id, input);
    }

    // Delete
    @Mutation(() => Boolean)
    removeProduct(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
      return this.productsService.remove(id);
    }
}
