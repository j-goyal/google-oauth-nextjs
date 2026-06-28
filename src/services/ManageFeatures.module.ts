
import axios from "@/lib/AxiosMethods";
import { ResponseDto } from "@/types/common/ResponseDto";
import { FeatureMasterDataDto } from "@/types/features/FeatureMasterDataDto";

export const ManageFeaturesService = () => {
  const getMasterData = (): Promise<ResponseDto<FeatureMasterDataDto>> =>
    axios.getTypedData<FeatureMasterDataDto>("/api/v1/features/master-data");

  return {
    getMasterData,
  };
};
