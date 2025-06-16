import { PlatformServiceTermsEnum } from "@/enums/platform-service-terms-enum";
import { useRequest } from "@/utils";

export function useRulesConfig(params: { typeDc: PlatformServiceTermsEnum }) {
  return useRequest<{content: string}>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/manage/platformservicetermsconfig/app/detail`,
    data: params
  });
}