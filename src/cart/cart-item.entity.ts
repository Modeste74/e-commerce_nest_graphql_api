import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "src/products/product.entity";
import { User } from "src/users/user.entity";

@ObjectType()
@Entity()
export class CartItem {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Product)
    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    product: Product;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.cartItems, { onDelete: 'CASCADE' })
    user: User;

    @Field()
    @Column()
    quantity: number;
}