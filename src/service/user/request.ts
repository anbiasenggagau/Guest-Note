import { UserObject } from "../../model/user";

export type RequestBody = Pick<UserObject, "username" | "password">