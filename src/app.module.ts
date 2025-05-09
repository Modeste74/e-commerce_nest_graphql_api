import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the env variables app-wide
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ! Turn off in production
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Required in NestJS v10+
      autoSchemaFile: true, // auto generates GraphQL schema
      context: ({ req }) => {
        console.log("Request user:", req.user); // Log the `req.user` to ensure it's populated correctly
        return { user: req.user };
      }, // This is essential
      playground: true,
    }),
    ProductsModule,
    CartModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
