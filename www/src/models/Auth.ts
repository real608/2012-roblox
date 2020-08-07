import { Required, Enum } from "@tsed/common";

export class SignupRequest {
    @Required()
    username: string;
    @Required()
    password: string;
    @Required()
    @Enum(2, 3)
    gender: 2 | 3;
    @Required()
    birthday: string;
    @Required()
    captcha: string;
}