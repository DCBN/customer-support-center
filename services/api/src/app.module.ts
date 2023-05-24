import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TicketModule } from "./ticket/ticket.module";
import { AgentModule } from "./agent/agent.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";
import { PassportModule } from "@nestjs/passport";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: ["dist/**/*.entity.js"],
      synchronize: true,
    }),
    PassportModule.register({
      session: true,
    }),
    EventEmitterModule.forRoot(),
    TicketModule,
    AgentModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
