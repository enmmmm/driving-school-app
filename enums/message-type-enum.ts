import type { V2NIMMessageType } from 'nim-web-sdk-ng/dist/v2/NIM_RN_SDK/V2NIMMessageService';

export enum MessageTypeEnum {
  /** 未知，不合法 */
  V2NIM_MESSAGE_TYPE_INVALID = -1,
  /** 0 文本 */
  V2NIM_MESSAGE_TYPE_TEXT = 0,
  /** 1 图片 */
  V2NIM_MESSAGE_TYPE_IMAGE = 1,
  /** 2 语音 */
  V2NIM_MESSAGE_TYPE_AUDIO = 2,
  /** 3 视频 */
  V2NIM_MESSAGE_TYPE_VIDEO = 3,
  /** 4 位置 */
  V2NIM_MESSAGE_TYPE_LOCATION = 4,
  /** 5 通知 */
  V2NIM_MESSAGE_TYPE_NOTIFICATION = 5,
  /** 6 文件 */
  V2NIM_MESSAGE_TYPE_FILE = 6,
  /** 7 音视频通话 */
  V2NIM_MESSAGE_TYPE_AVCHAT = 7,
  /** 10 提示 */
  V2NIM_MESSAGE_TYPE_TIPS = 10,
  /** 11 机器人 */
  V2NIM_MESSAGE_TYPE_ROBOT = 11,
  /** 12 话单 */
  V2NIM_MESSAGE_TYPE_CALL = 12,
  /** 100 自定义 */
  V2NIM_MESSAGE_TYPE_CUSTOM = 100
}
