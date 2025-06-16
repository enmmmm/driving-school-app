import {StandardTypeEnum} from "@/enums";
import {request} from "@/utils";

/**
 * 控件类型
 * 区间类型格式为逗号拼接，例如：2022-02-02,2023-02-02
 */
export enum ControlType {
  TEXT = 'TEXT', // 文本
  SWITCH = 'SWITCH', // 开关
  IMAGE = 'IMAGE', // 图片
  YEAR = 'YEAR', // 年
  YEAR_RANGE = 'YEAR_RANGE', // 年份区间
  MONTH = 'MONTH', // 月份
  MONTH_RANGE = 'MONTH_RANGE', // 月份区间
  DATE = 'DATE', // 日期
  DATE_RANGE = 'DATE_RANGE', // 日期区间
  DATE_TIME = 'DATE_TIME', // 日期时间
  DATE_TIME_RANGE = 'DATE_TIME_RANGE', // 日期时间区间
  TIME = 'TIME', // 时间
}

export interface ParamItem {
  id: string;
  /**
   * 目录id
   */
  catalogId: number;
  /**
   * 目录名称
   */
  catalogName: string;
  /**
   * 控件类型
   */
  controlType: ControlType;
  hosId: number;
  /**
   * 参数编码
   */
  paramCode: string;
  /**
   * 参数描述
   */
  paramDesc: string;
  /**
   * 参数名称
   */
  paramName: string;
  /**
   * 参数值
   */
  paramValue: string;
  /**
   * 是否标准，0标准参数 1医院参数
   */
  standardType: StandardTypeEnum;
  /**
   * 院区参数数组
   */
  yardValues?: YardValue[];
}

export interface YardValue {
  /**
   * 院区参数值
   */
  paramValue: string;
  /**
   * 院区编码
   */
  yardCode: string;
  /**
   * 院区名称
   */
  yardName: string;
}

/**
 * 将接口返回数据处理为{code: value}形式
 * @param params
 */
function paramResultHandler(params: ParamItem[]) {
  return params.reduce(
    (o, item: ParamItem) =>
      Object.assign(o, {
        [item.paramCode]: item.paramValue,
      }),
    {},
  );
}

/**
 * 获取系统参数
 * @param paramCodes
 */
export function getParam<PCS extends readonly string[]>(paramCodes: PCS): Promise<{ [key in PCS[number]]?: string }> {
  return request<ParamItem[]>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/manage/param/value/list/query`,
    data: {
      paramCode: paramCodes,
    },
  }).then(paramResultHandler);
}
