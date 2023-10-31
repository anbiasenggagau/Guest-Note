import { GuestObject } from "../../model/guest";


export type RequestBody = Omit<GuestObject, "id" | "createdAt" | "updatedAt">