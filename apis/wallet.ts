import { request } from "@/utils";

export namespace GetUserWallet {
  export interface Response {
    /**
     * 当前余额
     */
    coinBalance: number;
    /**
     * 是否会员
     */
    isVip: boolean;
    /**
     * 会员结束时间
     */
    vipEndTime: string;
  }
}

export namespace CreateOrder {
  export interface Request {
    /**
     * 业务id，如果是google、apple内购支付需要提前设置付款料,然后根据configId查询对应的商品
     */
    businessId?: string;
    /**
     * 充值类型，1 金币 2 会员
     */
    businessType: number;
    /**
     * 充值金额
     */
    payCost: number;
    /**
     * 价格单位
     */
    currency: string;
    /**
     * 支付方式，1：apple ，2:google 3：paypal 4: Bizum，5:mada， 6:payfort，7:微信支付，8:支付宝支付
     */
    payWay: number;
    /**
     * 系统
     */
    system?: string;
    /**
     * 交易类型，传 3 app支付
     */
    tradeType: string;
  }

  export interface Response {
    /**
     * 系统交易流水号，给支付系统的流水号
     */
    payTradeNo: string;
  }
}

export namespace GetCoinConfig {
  export interface Response {
    /**
     * 苹果商品号
     */
    appleProductNo: string;
    /**
     * google商品号
     */
    googleProductNo: string;
    /**
     * 业务id
     */
    id: string;
  }
}

// 充值记录
export namespace GetRechargeHistory {
  export interface Response {
    /**
     * 充值金币，按月为纬度
     */
    coin: number;
    /**
     * 充值详情列表
     */
    detailList: DetailList[];
    /**
     * 充值月份
     */
    month: string;
  }

  export interface DetailList {
    /**
     * 是否金币充值，true 是 false 否
     */
    isCoin: boolean;
    /**
     * 操作时间
     */
    operateTime: string;
    /**
     * 充值内容
     */
    rechargeContent: string;
    /**
     * 充值金额
     */
    rechargeCost: number;
    /**
     * 价格单位
     */
    currencyLabel: string;
  }
}

// 消费记录
export namespace GetConsumeHistory {
  export interface Response {
    /**
     * 消费金币，按月为纬度
     */
    coin: number;
    /**
     * 消费详情列表
     */
    detailList: DetailList[];
    /**
     * 消费月份
     */
    month: string;
  }

  export interface DetailList {
    /**
     * 消费金币
     */
    coin: number;
    /**
     * 视频集数
     */
    episodeId: number;
    /**
     * 操作时间
     */
    operateTime: string;
    /**
     * 视频名称
     */
    videoName: string;
  }
}

/**
 * 查询用户钱包资产
 */
export function getUserWallet() {
  return request<GetUserWallet.Response>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/purse/user/asset`,
  })
}

/**
 * 查询金币配置
 */
export function getCoinConfig() {
  return request<GetCoinConfig.Response[]>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/purse/recharge/coin/config`,
  })
}

/**
 * 查询会员配置
 */
export function getVipConfig() {
  return request<GetCoinConfig.Response[]>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/purse/vip/item/config`,
  })
}

/**
 * 下单接口
 */
export function createOrder(params: CreateOrder.Request) {
  return request<CreateOrder.Response>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/purse/order/create`,
    method: "POST",
    data: params
  })
}

/**
 * 验证订单
 */
export function verifyOrder(params: {
  /**
   * 应用收据
   */
  appReceipt: string;
  /**
   * 业务id
   */
  businessId?: number;
  /**
   * 充值类型，1 金币 2 会员
   */
  businessType?: string;
  /**
   * 交易订单号
   */
  payTradeNo: string;
}) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/purse/verify/order`,
    method: "POST",
    data: params
  })
}

/**
 * 充值记录查询
 */
export function getRechargeHistory(params: {screenDate: string}) {
  return request<GetRechargeHistory.Response[]>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/purse/query/recharge/record`,
    data: params
  })
}

/**
 * 消费记录查询
 */
export function getConsumeHistory(params: {screenDate: string}) {
  return request<GetConsumeHistory.Response[]>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/purse/query/consume/record`,
    data: params
  })
}