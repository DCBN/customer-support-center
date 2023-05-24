import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user.service";
import { PublicUser } from "src/user/user.type";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UserService) {
        super();
    }

    serializeUser(user: PublicUser, done: Function) {
        return done(null, user);
    }

    async deserializeUser(user: PublicUser, done: Function) {
        const userFromDb = await this.userService.findById(Number(user.id));
        return userFromDb ? done(null, userFromDb) : done(new Error('Could not find user'), null);
    }
}