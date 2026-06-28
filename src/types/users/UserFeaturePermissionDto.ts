export interface UserFeaturePermissionDto {
    userId: string;
    features: UserFeatureAccessDto[];
}

export interface UserFeatureAccessDto {
    featureCode: string;
    permissionCodes: string[];
}