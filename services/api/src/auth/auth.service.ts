import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { SignInDto } from "./dto";
import { PublicUser } from "src/user/user.type";
import { CreateUserDto } from "src/user/dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<PublicUser | null> {
    const user = await this.userService.findRawByEmail(email);

    if (!user) {
      return null;
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      const { id, name, email, role } = user;
      return {
        id,
        name,
        email,
        role,
      };
      
    } else {
      return null;
    }
  }

  async signUp(body: CreateUserDto) {
    try {
      const { id, name, email, role } = await this.userService.create(body);

      return {
        id,
        name,
        email,
        role,
      };

    } catch (err) {
      if (err instanceof HttpException) {
        throw err
      }

      throw new HttpException('Unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
