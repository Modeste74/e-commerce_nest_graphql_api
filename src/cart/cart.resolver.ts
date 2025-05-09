import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { CartItem } from './cart-item.entity';
import { AddToCartInput } from './dto/add-to-cart.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { User } from 'src/users/user.entity';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Resolver(() => CartItem)
export class CartResolver {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [CartItem])
    findAllCartItems(@CurrentUser() user: User) {
        return this.cartService.findAll(user.id);
    }

    @Query(() => CartItem)
    findCartItem(@Args('id', { type: () => Int } ) id: number) {
      return this.cartService.findOne(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => CartItem)
    addToCart(
        @Args('input') input: AddToCartInput,
        @CurrentUser() user: User,
    ) {
        console.log('Current user:', user); // Debugging log
        return this.cartService.addToCart(input, user);
    }

    @Mutation(() => CartItem)
    updateCartItem(
        @Args('id', { type: () => Int }) id: number,
        @Args('quantity', { type: () => Int }) quantity: number,
    ) {
        return this.cartService.updateCartItem(id, quantity);
    }

    @Mutation(() => Boolean)
    removeCartItem(@Args('id', { type: () => Int }) id: number) {
      return this.cartService.removeCartItem(id);
    }
}
