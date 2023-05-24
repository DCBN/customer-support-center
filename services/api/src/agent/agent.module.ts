import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AgentController } from './agent.controller';

@Module({
  imports: [UserModule],
  controllers: [AgentController],
})
export class AgentModule {}
