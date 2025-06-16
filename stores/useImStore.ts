// import { create } from 'zustand';
// import NIM from 'nim-web-sdk-ng/dist/v2/NIM_RN_SDK';
// import useUserStore from './useUserStore';
// import { V2NIMConnectStatus, V2NIMLoginStatus } from 'nim-web-sdk-ng/dist/v2/NIM_RN_SDK/V2NIMLoginService';
// import { V2NIMError } from 'nim-web-sdk-ng/dist/v2/NIM_RN_SDK/types';
// import type { V2NIMMessage, V2NIMSendMessageResult } from 'nim-web-sdk-ng/dist/v2/NIM_RN_SDK/V2NIMMessageService';
// import { MessageTypeEnum } from '@/enums/message-type-enum';
// import { V2NIMUser } from 'nim-web-sdk-ng/dist/v2/NIM_RN_SDK/V2NIMUserService';

// export const LIMIT = 100;

// interface ImInterface {
//   /**
//    * 实例
//    */
//   nim: NIM | undefined;
//   /**
//    * 当前会话id
//    */
//   conversationId: string | undefined;
//   /**
//    * 当前会话聊天消息
//    */
//   messages: V2NIMMessage[];
//   /**
//    * 客服信息
//    */
//   customerServiceInfo: {
//     robotName?: string;
//     robotAvatar?: string;
//     agents?: any[];
//   };

//   users: V2NIMUser[];

//   init: () => Promise<NIM | undefined>;
//   destroy: () => void;
//   removeAllListeners: () => void;
//   onConnectStatus: (status: V2NIMConnectStatus) => void;
//   onDisconnected: (error: V2NIMError) => void;
//   onConnectFailed: (error: V2NIMError) => void;
//   onReceiveMessages: (messages: V2NIMMessage[]) => void;
//   sendMessage: (params: any) => void;
//   mergeMessages: (messages: V2NIMMessage[]) => V2NIMMessage[];
//   revokeMessage: (message: V2NIMMessage) => void;
//   getHistoryMessages: (params: { conversationId: string; rePull?: boolean }) => Promise<V2NIMMessage[]>;
//   setCustomerServiceInfo: (params: any) => void;
//   getUserProfilesByMessages: (messages: V2NIMMessage[]) => void;
// }

// const useImStore = create<ImInterface>((set, get) => ({
//   nim: undefined,
//   conversationId: undefined,
//   messages: [],
//   customerServiceInfo: {},
//   users: [],
//   init: async () => {
//     const { imUserId, imToken } = useUserStore.getState().userInfo || {};
//     if (!imUserId || !imToken) return;
//     let nim = get().nim;
//     if (!nim) {
//       nim = NIM.getInstance({
//         appkey: '0f5026e4dc319f472c8b464517f01a1f',
//         apiVersion: 'v2',
//         lbsUrls: ['https://lbs.netease.im/lbs/webconf'],
//         linkUrl: 'weblink01-sg.netease.im:443',
//         debugLevel: 'error'
//       });
//       set(() => ({ nim }));
//     }
//     nim.V2NIMLoginService.on('onConnectStatus', get().onConnectStatus);
//     nim.V2NIMLoginService.on('onDisconnected', get().onDisconnected);
//     nim.V2NIMLoginService.on('onConnectFailed', get().onConnectFailed);
//     nim.V2NIMMessageService.on('onReceiveMessages', get().onReceiveMessages);
//     const loginStatus = nim.V2NIMLoginService.getLoginStatus();
//     if (loginStatus !== 1) {
//       await nim.V2NIMLoginService.login(imUserId, imToken, {
//         forceMode: false
//       });
//     }
//     console.log('useImStore.init.nim', nim);
//     return nim;
//   },
//   removeAllListeners: () => {
//     const { nim } = get();
//     if (!nim) return;
//     nim.V2NIMLoginService.removeAllListeners();
//     nim.V2NIMMessageService.removeAllListeners();
//   },

//   destroy: () => {
//     const { nim, removeAllListeners } = get();
//     if (!nim) return;
//     const loginStatus = nim.V2NIMLoginService.getLoginStatus();
//     if (loginStatus !== 0) nim.V2NIMLoginService.logout();
//     removeAllListeners();
//     set(() => ({ nim: undefined, conversationId: undefined, messages: [], customerServiceInfo: {} }));
//   },

//   // 登录连接状态变化回调
//   onConnectStatus: (status: V2NIMConnectStatus) => {
//     console.log('onConnectStatus', status);
//   },

//   // 登录连接断开回调
//   onDisconnected: (error: V2NIMError) => {
//     console.log('onDisconnected', error);
//   },

//   // 登录连接失败回调
//   onConnectFailed: (error: V2NIMError) => {
//     console.log('onConnectFailed', error);
//   },

//   onReceiveMessages: (messages: V2NIMMessage[]) => {
//     console.log('onReceiveMessages');
//     get().mergeMessages(messages);
//   },

//   sendMessage: async ({
//     conversationId,
//     type,
//     text,
//     filePaths,
//     custom
//   }: {
//     conversationId: string;
//     type: MessageTypeEnum;
//     text?: string;
//     filePaths?: string[];
//     custom?: object;
//   }) => {
//     const { nim, mergeMessages } = get();
//     if (!nim) return;
//     return new Promise<void>(async resolve => {
//       if (type === MessageTypeEnum.V2NIM_MESSAGE_TYPE_TEXT) {
//         const message: V2NIMMessage = nim.V2NIMMessageCreator.createTextMessage(text!);
//         const res: V2NIMSendMessageResult = await nim.V2NIMMessageService.sendMessage(message, conversationId);
//         mergeMessages([res.message]);
//         resolve();
//       } else if (type === MessageTypeEnum.V2NIM_MESSAGE_TYPE_IMAGE) {
//         filePaths?.forEach(async file => {
//           const message = nim.V2NIMMessageCreator.createImageMessage(file);
//           const res: V2NIMSendMessageResult = await nim.V2NIMMessageService.sendMessage(message, conversationId);
//           mergeMessages([res.message]);
//           resolve();
//         });
//       } else if (type === MessageTypeEnum.V2NIM_MESSAGE_TYPE_AUDIO) {
//         filePaths?.forEach(async file => {
//           const message = nim.V2NIMMessageCreator.createAudioMessage(file);
//           const res: V2NIMSendMessageResult = await nim.V2NIMMessageService.sendMessage(message, conversationId);
//           mergeMessages([res.message]);
//           resolve();
//         });
//       } else if (type === MessageTypeEnum.V2NIM_MESSAGE_TYPE_VIDEO) {
//         filePaths?.forEach(async file => {
//           const message = nim.V2NIMMessageCreator.createVideoMessage(file);
//           const res: V2NIMSendMessageResult = await nim.V2NIMMessageService.sendMessage(message, conversationId);
//           mergeMessages([res.message]);
//           resolve();
//         });
//       } else if (type === MessageTypeEnum.V2NIM_MESSAGE_TYPE_CUSTOM) {
//         const message: V2NIMMessage = nim.V2NIMMessageCreator.createCustomMessage(text!, JSON.stringify(custom));
//         const res: V2NIMSendMessageResult = await nim.V2NIMMessageService.sendMessage(message, conversationId);
//         mergeMessages([res.message]);
//         resolve();
//       } else {
//         filePaths?.forEach(async file => {
//           const message = nim.V2NIMMessageCreator.createFileMessage(file);
//           const res: V2NIMSendMessageResult = await nim.V2NIMMessageService.sendMessage(message, conversationId);
//           mergeMessages([res.message]);
//           resolve();
//         });
//       }
//     });
//   },

//   revokeMessage: async (message: V2NIMMessage) => {
//     const { nim } = get();
//     if (!nim) return;
//     try {
//       await nim.V2NIMMessageService.revokeMessage(message);
//       set(() => ({ messages: get().messages.filter(item => item.messageClientId !== message.messageClientId) }));
//     } catch (err) {
//       console.log('revokeMessage error', err);
//     }
//   },

//   mergeMessages: (newMessages: V2NIMMessage[]) => {
//     const { messages: oldMessages, getUserProfilesByMessages } = get();
//     const filteredNewMessages = newMessages.filter(
//       newMsg => !oldMessages.some(oldMsg => oldMsg.messageClientId === newMsg.messageClientId)
//     );
//     const messages = [...oldMessages, ...filteredNewMessages]
//       .filter(item => item.messageType !== MessageTypeEnum.V2NIM_MESSAGE_TYPE_NOTIFICATION)
//       .sort((a, b) => a.createTime - b.createTime);
//     set(() => ({ messages: messages }));
//     console.log('mergeMessages', newMessages);
//     getUserProfilesByMessages(messages);
//     return messages;
//   },

//   getHistoryMessages: async ({ conversationId, rePull }) => {
//     const { nim } = get();
//     if (!nim) {
//       return Promise.reject();
//     }
//     set(() => ({ conversationId }));
//     const loginStatus = nim.V2NIMLoginService.getLoginStatus();
//     if (loginStatus !== 1) {
//       return Promise.reject();
//     }
//     const messages = get().messages;
//     let endTime = messages && messages.length ? messages[0].createTime : new Date().getTime(); //上拉查询,查询历史,当前第一条消息的时间作为endTime
//     // 强制重新查询
//     if (rePull) {
//       endTime = new Date().getTime();
//     }
//     const result: V2NIMMessage[] = await nim.V2NIMMessageService.getMessageList({
//       conversationId: conversationId,
//       limit: LIMIT,
//       endTime,
//       direction: 0
//     });
//     console.log('getHistoryMessages', result);
//     get().mergeMessages(result);
//     return result;
//   },
//   setCustomerServiceInfo: params => {
//     set(() => ({ customerServiceInfo: { ...get().customerServiceInfo, ...params } }));
//   },
//   getUserProfilesByMessages: async (messages: V2NIMMessage[]) => {
//     const { nim, users = [] } = get();
//     if (!nim || !messages.length) return;
//     const accountIds = new Set([...messages.map(item => item.senderId)]);
//     const existingUserIds = new Set(users.map(user => user.accountId));
//     const newAccountIds = [...accountIds].filter(id => !existingUserIds.has(id));
//     if (newAccountIds.length === 0) return; // 没有新用户需要拉取
//     const userProfiles = await nim.V2NIMUserService.getUserList(newAccountIds);
//     set({ users: [...users, ...userProfiles] });
//   }
// }));

// export default useImStore;
