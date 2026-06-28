import { FeaturePermissionDto } from "@/types/permissions/FeaturePermissionDto";
import { PermissionDto } from "@/types/permissions/PermissionDto";
import { FeatureDto } from "@/types/features/FeatureDto";

export interface FeatureMasterDataDto {
  features: FeatureDto[];
  permissions: PermissionDto[];
  featurePermissions: FeaturePermissionDto[];
}