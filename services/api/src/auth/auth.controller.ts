import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Req,
  Res,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";
import { CreateUserDto } from "src/user/dto";
import { AuthService } from "./auth.service";
import { AuthenticatedGuard, LocalAuthGuard } from "./guards/local";

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("/signin")
  signIn(@Req() req: Request) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post("/signup")
  signUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/signout')
  signOut(@Req() request: Request, @Res() response: Response) {
    return request.logOut({ keepSessionInfo: false }, (err) => {
      console.log('err', err);
      response.clearCookie('authentication', { httpOnly: true })
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get("profile")
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
