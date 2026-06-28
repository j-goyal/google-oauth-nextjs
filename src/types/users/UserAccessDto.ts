import { UserFeaturePermissionDto } from "./UserFeaturePermissionDto";
import { UserDto } from "./UsersDto";

export interface UserAccessDto {
  user: UserDto;
  userFeaturePermission: UserFeaturePermissionDto;
}
