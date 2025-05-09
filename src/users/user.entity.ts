import { Field, ID, ObjectType } from "@nestjs/graphql";
import { CartItem } from "src/cart/cart-item.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Don't expose password field in GraphQL
  // @Field for password is hidden from the GraphQL schema.

  @Field(() => [CartItem], { nullable: true })
  @OneToMany(() => CartItem, (cartItem) => cartItem.user, { eager: true })
  cartItems: CartItem[];
}