import { UserFeatureAccessDto } from "./UserFeaturePermissionDto";

export interface UpdateUserAccessRequest {
  features: UserFeatureAccessDto[];
}