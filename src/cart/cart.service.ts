import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { AddToCartInput } from './dto/add-to-cart.input';
import { Product } from '../products/product.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addToCart(input: AddToCartInput, user: User): Promise<CartItem> {
    const product = await this.productRepository.findOneBy({ id: input.productId });

    if (!product) {
      throw new Error('Product not found');  // ⬅️ important to handle this
    }

    // Check if the product is already in the cart
    let cartItem = await this.cartRepository.findOne({
      where: {
        product: { id: input.productId },
        user: { id: user.id }
      },
      relations: ['product', 'user'],
    });

    if (cartItem) {
      // if product already exist in  cart, update the quantity
      cartItem.quantity += input.quantity;
    } else {
      // if product not in cart, create a new cart item
      cartItem = this.cartRepository.create({
        product,
        quantity: input.quantity,
        user,
      });
    }

    return this.cartRepository.save(cartItem);
  }

  async findAll(userId: number): Promise<CartItem[]> {
    return this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product', 'user']});
  }

  async findOne(id: number): Promise<CartItem> {
    const cartItem = await this.cartRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem> {
    const cartItem = await this.cartRepository.findOneBy({ id });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = quantity;
    return this.cartRepository.save(cartItem);
  }

  async removeCartItem(id: number): Promise<boolean> {
    const result = await this.cartRepository.delete(id);
    
    return !!result.affected && result.affected > 0;
 // true if something was deleted
  }
}
