import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './cart-item.entity';
import { Product } from 'src/products/product.entity';
import { CartResolver } from './cart.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Product])],
  providers: [CartService, CartResolver],
})
export class CartModule {}
