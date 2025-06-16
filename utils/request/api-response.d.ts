/**
 * 通用请求返回值类型定义
 */
export interface ComResponse<D = any> {
    readonly code: number;
    readonly message: string;
    readonly data: D;
    readonly success: boolean;
}

export interface PageInfo<M = any> {
    readonly models: M[];
    readonly first: boolean;
    readonly last: boolean;
    readonly number: number; // 第几页
    readonly numberOfElements: number; // 当前页数量
    readonly size: number; // 分页limit
    readonly totalElements: number; // 总数量
    readonly totalPages: number;
}

export interface PageParams {
    page: number;
    size: number;
}

export interface ComPageResponse<M = any> extends ComResponse<PageInfo<M>> {}
