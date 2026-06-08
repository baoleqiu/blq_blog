//#region src/typings/options.d.ts
// oxlint-disable-next-line typescript/explicit-module-boundary-types, typescript/no-explicit-any
type WalineAbort = (reason?: any) => void;
//#endregion
//#region src/comment.d.ts
interface WalineCommentCountOptions {
  /**
   * Waline 服务端地址
   *
   * Waline server url
   */
  serverURL: string;
  /**
   * 评论数 CSS 选择器
   *
   * Comment count CSS selector
   *
   * @default '.waline-comment-count'
   */
  selector?: string;
  /**
   * 需要获取的默认路径
   *
   * Path to be fetched by default
   *
   * @default window.location.pathname
   */
  path?: string;
  /**
   * 错误提示消息所使用的语言
   *
   * Language of error message
   *
   * @default navigator.language
   */
  lang?: string;
}
declare const commentCount: ({
  serverURL,
  path,
  selector,
  lang
}: WalineCommentCountOptions) => WalineAbort;
//#endregion
//#region src/version.d.ts
declare const version: string;
//#endregion
export { type WalineAbort, WalineCommentCountOptions, commentCount, version };
//# sourceMappingURL=comment.d.ts.map