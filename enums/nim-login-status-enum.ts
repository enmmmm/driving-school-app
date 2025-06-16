export const enum NimLoginStatusEnum  {
  /**
   * 未登录
   *
   * 注: 初始状态也是未登录.
   */
  V2NIM_LOGIN_STATUS_LOGOUT = 0,
  /**
   * 已登录
   */
  V2NIM_LOGIN_STATUS_LOGINED = 1,
  /**
   * 登录中
   */
  V2NIM_LOGIN_STATUS_LOGINING = 2,
  /**
   * 处在退避间隔中
   *
   * 注: 这是一个中间状态, SDK 将会在这个状态下等待一段时间后再次尝试登录
   */
  V2NIM_LOGIN_STATUS_UNLOGIN = 3
}
