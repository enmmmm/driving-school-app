/**
 * 支付状态枚举
 */
export enum PayStateEnum {
  /**
   * 未付款
   */
  wei_fu_kuan = 1,
  /**
   * 付款中
   */
  fu_kuan_zhong = 2,
  /**
   * his付款中
   */
  his_fu_kuan_zhong = 3,
  /**
   * 已付款
   */
  yi_fu_kuan = 4,
  /**
   * 已退款
   */
  yi_tui_kuan = 6,
  /**
   * 付款失败
   */
  fu_kuan_shi_bai = 7,
  /**
   * 退款中
   */
  tui_kuan_zhong = 8,
  /**
   * 部分退款
   */
  bu_fen_tui_kuan = 9,
  /**
   * 已取消
   */
  yi_qu_xiao = 10
}
