import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guards';
import { UserRole } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { handleError } from 'src/utils';
import { CreateAgentDto, UpdateAgentDto } from './dto';

@Controller('agent')
@UseGuards(AuthenticatedGuard)
export class AgentController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async getAgents() {
        try {
            const agents = await this.userService.findSupportAgents();
            return { agents }
        } catch (err) {
            return handleError(err, `Failed to find agents`);
        }
    }

    @Post()
    async createAgent(@Body() body: CreateAgentDto) {
        try {
            const agent = await this.userService.create({ ...body, role: UserRole.SUPPORT_AGENT });
            return { agent };
        } catch (err) {
            return handleError(err, `Failed to create agent`);
        }
    }

    @Get('/:id')
    async getAgent(@Param('id') id: number) {
        try {
            const agent = await this.userService.findById(id);
            return { agent };
        } catch (err) {
            return handleError(err, `Failed to find agent with id: ${id}`);
        }
    }

    @Put('/:id')
    async updateAgent(@Param('id') id: number, @Body() body: UpdateAgentDto) {
        try {
            await this.userService.update(id, body);
            return { id }
        } catch (err) {
            return handleError(err, `Failed to update agent with id: ${id}`);
        }
    }

    @Delete('/:id')
    async deleteAgent(@Param('id') id: number) {
        try {
            await this.userService.delete(id);
            return { id }
        } catch (err) {
            return handleError(err, `Failed to delete agent with id: ${id}`);
        }
    }
}
