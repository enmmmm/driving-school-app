import type {SWRResponse, SWRConfiguration} from 'swr'
import { SWRInfiniteConfiguration } from 'swr/infinite';
import {BareFetcher} from "swr/_internal";
import {Fetcher} from "swr/dist/_internal/types";

interface Method {
  /** HTTP 请求 OPTIONS */
  OPTIONS
  /** HTTP 请求 GET */
  GET
  /** HTTP 请求 HEAD */
  HEAD
  /** HTTP 请求 POST */
  POST
  /** HTTP 请求 PUT */
  PUT
  /** HTTP 请求 DELETE */
  DELETE
  /** HTTP 请求 TRACE */
  TRACE
  /** HTTP 请求 CONNECT */
  CONNECT
}

interface ResponseType {
  /** 二进制类型 */
  blob
  /** 响应的数据为文本 */
  text
  /** 响应的数据为 ArrayBuffer */
  arraybuffer
}

export interface RequestOption<Data = unknown> {
  /** 开发者服务器接口地址 */
  url: string
  /** 请求的参数 */
  data?: Data
  /** 设置请求的 header，header 中不能设置 Referer。 `content-type` 默认为 `application/json` */
  header?: Record<string, any>
  /** HTTP 请求方法 默认 GET */
  method?: keyof Method
  /** 响应的数据类型 */
  responseType?: keyof ResponseType
  /** 是否为请求元返回值 true: 返回请求元数据 false:返回请求结果的data数据 默认为false */
  wrapped?: boolean
  /** 请求自带loading效果，移动端查询类请求尽量采用骨架屏方式实现 */
  loading?: boolean
}

export interface SuccessCallbackResult<T > {
  /** 开发者服务器返回的数据 */
  data: T
  /** 开发者服务器返回的 HTTP Response Header */
  header: Record<string, any>
  /** 开发者服务器返回的 HTTP 状态码 */
  statusCode: number
  /** 调用结果 */
  errMsg: string
  /** cookies */
  cookies?: string[]
}

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : Error

export interface SWRPageResponse <Data = any, Error = any > extends SWRResponse {
  data: Data;
  error: Error;
  isLast: boolean;  // 是否为最后一页
  loadMore: ()=>void; // 加载下一页
  totalElements?: string;
}

/**
 * 通用请求api
 */
export interface CoreRequest {
  /**
   * 直接返回请求结果的data数据，不需要再处理
   * @param option
   */
    <ResponseData, Data = unknown>(option: RequestOption<Data> & { wrapped?: false }): Promise<ResponseData>

  /**
   * 返回请求元数据，可能需要再处理
   * @param option
   */
    <ResponseData, Data = unknown>(option: RequestOption<Data> & { wrapped: true }): Promise<SuccessCallbackResult<ResponseData>>
}

export interface UseRequestOption<Data = unknown> extends RequestOption<Data> {
  /** 请求结果是否需要持久化，所有数据的存储上限为1M */
  persist?: boolean
}

/**
 * {@link CoreRequest} hooks实现
 */
export interface CoreUseRequest {
  <ResponseData, Data = unknown, Error = any>(option: UseRequestOption<Data> & { wrapped?: false } | null, fetcher?: Fetcher<Data> | null, config?: SWRConfiguration<Data, Error, Fetcher<Data>>): SWRResponse<ResponseData, Error>
  <ResponseData, Data = unknown, Error = any>(option: UseRequestOption<Data> & { wrapped: true } | null, fetcher?: Fetcher<Data> | null, config?: SWRConfiguration<Data, Error, Fetcher<Data>>): SWRResponse<UnwrapPromise<SuccessCallbackResult<ResponseData>>, Error>
}

export interface PageRequestOption extends UseRequestOption {
  page?: number;
  size?: number;
}

/**
 * {@link CoreRequest} 分页hooks实现
 */
export interface CoreUsePageRequest {
  <ResponseData, Data = unknown,  Error = any>(option: PageRequestOption , config?: SWRInfiniteConfiguration<Data,Error, BareFetcher<Data>>): SWRPageResponse<ResponseData, Error>
}

/**
 * 直接返回请求结果的data数据，不需要再处理
 * @param option
 */
export const request: CoreRequest;
export const useRequest: CoreUseRequest;
export const usePageRequest: CoreUsePageRequest;
