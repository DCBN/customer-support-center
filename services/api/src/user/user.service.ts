import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateAgentDto } from "src/agent/dto/updateAgent";
import { TicketEntity } from "src/ticket/ticket.entity";
import { DeleteResult, FindOptionsSelect, Repository, UpdateResult } from "typeorm";
import { CreateUserDto } from "./dto";
import { UserEntity, UserRole } from "./user.entity";
import { PublicUser } from "./user.type";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  private PUBLIC_FIELDS: FindOptionsSelect<UserEntity> = {
    id: true,
    email: true,
    name: true,
    role: true,
    createdAt: true,
  };

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(body: CreateUserDto): Promise<UserEntity> {
    const exists = await this.userRepository.exist({
      where: {
        email: body.email
      }
    });

    if (exists) {
      throw new HttpException(`User with email already exists: ${body.email}`, HttpStatus.CONFLICT);
    }

    const password = await bcrypt.hash(body.password, 10);

    const user = this.userRepository.create({ ...body, password });
    return this.userRepository.save(user);
  }

  findRawByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  findById(id: number): Promise<PublicUser | null> {
    return this.userRepository.findOne({
      where: {
        id,
      },
      select: this.PUBLIC_FIELDS,
    });
  }

  findSupportAgents(): Promise<PublicUser[] | null> {
    return this.userRepository.find({
      where: {
        role: UserRole.SUPPORT_AGENT,
      },
      select: this.PUBLIC_FIELDS,
    });
  }

  findUnassignedAgent(): Promise<PublicUser | null> {
    const fields = Object.keys(this.PUBLIC_FIELDS).map(field => `user.${field}`);

    return this.userRepository
      .createQueryBuilder("user")
      .select(fields)
      .leftJoinAndSelect(TicketEntity, "ticket", "ticket.agentId = user.id")
      .where("user.role = :role", { role: UserRole.SUPPORT_AGENT })
      .andWhere("ticket.agentId is NULL")
      .getOne();
  }

  async update(id: number, body: UpdateAgentDto): Promise<UpdateResult> {
    const exists = await this.userRepository.exist({
      where: {
        id
      }
    });

    if (!exists) {
      throw new HttpException(`User does not exist: ${id}`, HttpStatus.NOT_FOUND)
    }

    return this.userRepository.update({ id }, body);
  }

  async delete(id: number): Promise<DeleteResult>  {
    const exists = await this.userRepository.exist({
      where: {
        id
      }
    });

    if (!exists) {
      throw new HttpException(`User does not exist: ${id}`, HttpStatus.NOT_FOUND)
    }

    return this.userRepository.softDelete({ id });
  }
}
