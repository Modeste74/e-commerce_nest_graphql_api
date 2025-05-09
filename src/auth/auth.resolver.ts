import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { User } from 'src/users/user.entity';
import { AuthResponse } from './dto/auth-response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async register(@Args('input') input: RegisterInput) {
    return this.authService.register(input.email, input.password);
  }

  // @Mutation(() => String)
  // async login(@Args('input') input: LoginInput) {
  //   const token = await this.authService.login(input.email, input.password);

  //   return token.access_token;
  // }

  @Mutation(() => AuthResponse)
  login(
    @Args('input') input: LoginInput,
  ): Promise<AuthResponse> {
    return this.authService.login(input.email, input.password);
  }
}
