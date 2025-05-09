import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
	  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	  ignoreExpiration: false,
	  secretOrKey: config.get<string>('JWT_SECRET')! // or use directly if you prefer
	});
  }

  async validate(payload: any) {
    // console.log('JWT Payload:', payload); // Log the payload to ensure it's correctly extracted
    return { id: payload.sub, email: payload.email }; // This becomes req.user
  }
}
