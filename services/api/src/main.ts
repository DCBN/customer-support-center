import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import session from "express-session";
import passport from "passport";
import { TypeormStore } from "connect-typeorm";
import * as dotenv from "dotenv";
import { SessionEntity } from "src/session";
import { DataSource } from "typeorm";
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {
    credentials: true,
    origin: 'http://localhost:3000'
  } });
  const sessionRepo = app.get(DataSource).getRepository(SessionEntity);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.use(
    session({
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: Number(process.env.SESSION_MAX_AGE),
        httpOnly: true
      },
      store: new TypeormStore().connect(sessionRepo),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3001);
}
bootstrap();
