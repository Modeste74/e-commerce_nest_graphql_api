import { InputType, Field, Float, Int, PartialType } from "@nestjs/graphql";
import { CreateProductInput } from "./create-input.input";

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}