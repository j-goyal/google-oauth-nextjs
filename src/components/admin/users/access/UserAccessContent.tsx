"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import UserAccessHeader from "./UserAccessHeader";
import FeatureList from "@/components/admin/users/access/FeatureList";
import PermissionList from "@/components/admin/users/access/PermissionList";
import SaveAccessFooter from "@/components/admin/users/access/SaveAccessFooter";
import toast from "react-hot-toast";
import { UserDto } from "@/types/users/UsersDto";
import { FeatureDto } from "@/types/features/FeatureDto";
import { PermissionDto } from "@/types/permissions/PermissionDto";
import { FeaturePermissionDto } from "@/types/permissions/FeaturePermissionDto";
import { UserFeaturePermissionDto } from "@/types/users/UserFeaturePermissionDto";
import { ManageUsersService } from "@/services/ManageUsers.module";
import { ManageFeaturesService } from "@/services/ManageFeatures.module";
import { getErrorMessage } from "@/utils/getErrorMessage";
import UserAccessShimmer from "@/components/shimmer/UserAccessShimmer";

interface UserAccessContentProps {
  userId: string;
}

export default function UserAccessContent({ userId }: UserAccessContentProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [user, setUser] = useState<UserDto | null>(null);
  const [features, setFeatures] = useState<FeatureDto[]>([]);
  const [permissions, setPermissions] = useState<PermissionDto[]>([]);
  const [featurePermissions, setFeaturePermissions] = useState<FeaturePermissionDto[]>([]);
  const [userPermissions, setUserPermissions] = useState<UserFeaturePermissionDto | null>(null);
  const [selectedFeatureCode, setSelectedFeatureCode] = useState("");
  const manageUsersService = ManageUsersService();
  const manageFeaturesService = ManageFeaturesService();
  
  useEffect(() => {
    loadData();
  }, [userId]);

  useEffect(() => {
    if (!selectedFeatureCode && features.length > 0) {
      setSelectedFeatureCode(features[0].code);
    }
  }, [features, selectedFeatureCode]);

  const loadData = async () => {
    try {
      setLoading(true);

      const [masterResponse, userAccessResponse] = await Promise.all([
        manageFeaturesService.getMasterData(),
        manageUsersService.getUserAccess(userId),
      ]);

      if (!masterResponse.success) {
        toast.error(getErrorMessage(masterResponse.error));
        return;
      }

      if (!userAccessResponse.success) {
        toast.error(getErrorMessage(userAccessResponse.error));
        return;
      }

      const masterData = masterResponse.data;
      const userAccess = userAccessResponse.data;

      setFeatures(masterData.features);
      setPermissions(masterData.permissions);
      setFeaturePermissions(masterData.featurePermissions);

      setUser(userAccess.user);
      setUserPermissions(userAccess.userFeaturePermission);
    } catch {
      toast.error("Error while loading user access. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  const selectedFeature = useMemo(
    () => features.find((feature) => feature.code === selectedFeatureCode),
    [features, selectedFeatureCode],
  );

  const availablePermissions = useMemo(() => {
    if (!selectedFeature) return [];

    const featurePermission = featurePermissions.find(
      (x) => x.featureId === selectedFeature.id,
    );

    if (!featurePermission) return [];

    return permissions.filter((permission) =>
      featurePermission.permissionIds.includes(permission.id),
    );
  }, [selectedFeature, featurePermissions, permissions]);

  const selectedPermissionCodes = useMemo(() => {
    if (!userPermissions) return [];

    return (
      userPermissions.features.find(
        (x) => x.featureCode === selectedFeatureCode,
      )?.permissionCodes ?? []
    );
  }, [userPermissions, selectedFeatureCode]);

  const handlePermissionToggle = (permissionCode: string) => {
    if (!userPermissions) return;

    setUserPermissions((prev) => {
      if (!prev) return prev;

      const featureIndex = prev.features.findIndex(
        (x) => x.featureCode === selectedFeatureCode,
      );

      const updatedFeatures = [...prev.features];

      if (featureIndex === -1) {
        updatedFeatures.push({
          featureCode: selectedFeatureCode,
          permissionCodes: [permissionCode],
        });
      } else {
        const feature = {
          ...updatedFeatures[featureIndex],
        };

        if (feature.permissionCodes.includes(permissionCode)) {
          feature.permissionCodes = feature.permissionCodes.filter(
            (x) => x !== permissionCode,
          );

          if (feature.permissionCodes.length === 0) {
            updatedFeatures.splice(featureIndex, 1);
          } else {
            updatedFeatures[featureIndex] = feature;
          }
        } else {
          feature.permissionCodes = [
            ...feature.permissionCodes,
            permissionCode,
          ];

          updatedFeatures[featureIndex] = feature;
        }
      }

      return {
        ...prev,
        features: updatedFeatures,
      };
    });

    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!userPermissions) return;

    try {
      setSaving(true);

      const response = await manageUsersService.updateUserAccess(userId, {
        features: userPermissions.features,
      });

      if (response.success) {
        toast.success("User access updated successfully.");
        setHasChanges(false);
      } else {
        toast.error(getErrorMessage(response.error));
      }
    } catch {
      toast.error("Error while updating user access. Please contact support.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <UserAccessShimmer />;
  }

  if (!user || !userPermissions) {
    return null;
  }

  return (
    <main className="flex-1 py-5 px-4 pt-30">
      <div className="mx-auto max-w-6xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <UserAccessHeader user={user} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 min-[800px]:grid-cols-2 gap-6 lg:grid-cols-3"
        >
          <FeatureList
            features={features}
            selectedFeatureCode={selectedFeatureCode}
            onSelect={setSelectedFeatureCode}
          />

          <div className="lg:col-span-2">
            {selectedFeature && (
              <PermissionList
                feature={selectedFeature}
                permissions={availablePermissions}
                selectedPermissions={selectedPermissionCodes}
                onToggle={handlePermissionToggle}
              />
            )}
          </div>
        </motion.div>

        {hasChanges && (
          <SaveAccessFooter
            onSave={handleSave}
            hasChanges={hasChanges}
            isLoading={saving}
          />
        )}
      </div>
    </main>
  );
}
