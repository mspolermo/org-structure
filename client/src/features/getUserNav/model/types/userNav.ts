import { NavGroupType } from "@/entities/Navigation";
import { User } from "@/entities/User";

export interface UserNavType {
    groups: NavGroupType[];
    user: User;
}