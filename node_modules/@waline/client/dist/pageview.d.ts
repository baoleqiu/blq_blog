//#region src/version.d.ts
declare const version: string;
//#endregion
//#region src/typings/options.d.ts
// oxlint-disable-next-line typescript/explicit-module-boundary-types, typescript/no-explicit-any
type WalineAbort = (reason?: any) => void;
//#endregion
//#region src/pageview.d.ts
interface WalinePageviewCountOptions {
  /**
   * Waline 服务端地址
   *
   * Waline server url
   */
  serverURL: string;
  /**
   * 浏览量 CSS 选择器
   *
   * Pageview CSS selector
   *
   * @default '.waline-pageview-count'
   */
  selector?: string;
  /**
   * 需要更新和获取的路径
   *
   * Path to be fetched and updated
   *
   * @default window.location.pathname
   */
  path?: string;
  /**
   * 是否在查询时更新 path 的浏览量
   *
   * Whether update pageviews when fetching path result
   *
   * @default true
   */
  update?: boolean;
  /**
   * 错误提示消息所使用的语言
   *
   * Language of error message
   *
   * @default navigator.language
   */
  lang?: string;
}
declare const pageviewCount: ({
  serverURL,
  path,
  selector,
  update,
  lang
}: WalinePageviewCountOptions) => WalineAbort;
//#endregion
export { type WalineAbort, WalinePageviewCountOptions, pageviewCount, version };
//# sourceMappingURL=pageview.d.ts.map