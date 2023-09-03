import { DbMysql } from "../database/data-source.mysql";
import User from "../entities/user.entity";
import bcrypt from "bcrypt";
import { getRandomChars, getRandomString } from "../utils/random";
import { Profile } from "passport";

export default class AuthService {

    private repoUser = DbMysql.getRepository(User);

    public async createUser(email: string, password: string, name: string) {
        const isExist = await this.repoUser.exist({ where: { email: email } });
        if (!isExist) {
            const hashPassword: string = await this.getHashPassword(password);
            const validName: string = name ? name : `Guest${getRandomChars("0123456789", 5)}`;
            const user = this.repoUser.create({ email: email, password: hashPassword, name: validName });
            await this.repoUser.save(user);
            return true;
        }
        return false;
    }

    public async findUser(email: string, password: string) {
        const user = await this.repoUser.findOne({ where: { email: email } });
        if (user) {
            const isSuccess = await bcrypt.compare(password, user.password);
            if (isSuccess) return user;
        }
        return undefined;
    }

    public async findUserByOAuthFacebook(profile: Profile) {
        if (!profile) return undefined;

        const id = profile.id;
        let user = await this.createUserByOAuth(profile, { facebookId: id });
        if (!user.facebookId) {
            user.facebookId = id;
            await this.repoUser.update(user, { facebookId: id });
        }
        return user.facebookId === id ? user : undefined;
    }

    public async findUserByOAuthGoogle(profile: Profile) {
        if (!profile) return undefined;

        const id = profile.id;
        let user = await this.createUserByOAuth(profile, { googleId: id });
        if (!user.googleId) {
            user.googleId = id;
            await this.repoUser.update(user, { googleId: id });
        }
        return user.googleId === id ? user : undefined;
    }

    private async createUserByOAuth(profile: Profile, ids: { facebookId?: string, googleId?: string }) {
        const name = profile.displayName;
        const email = profile.emails![0].value;

        let user = await this.repoUser.findOne({ where: { email: email } });
        if (!user) {
            const password = await this.getHashPassword(getRandomString(16));
            user = this.repoUser.create({ email: email, name: name, password: password });
            user.facebookId = ids.facebookId ?? "";
            user.googleId = ids.googleId ?? "";
            user = await this.repoUser.save(user);
        }
        return user;
    }

    private async getHashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }
}