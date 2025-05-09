import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AddToCartInput {
    @Field(() => Int)
    productId: number;

    @Field(() => Int)
    quantity: number;
}