import { Ref } from 'vue';
import { ImgViewerProps } from '../types';
/**
 * 图片缩放器
 * @param targetRef - 预览图 ref
 * @param props - 图片查看器组件的 props
 * @returns 图片缩放器 API
 */
export declare function useTransformer(targetRef: Ref<HTMLElement | null>, props: ImgViewerProps): {
    handleWheel: (e: WheelEvent) => void;
    handleTouchStart: (e: TouchEvent) => void;
    handleDblclick: () => void;
    handleMouseDown: (e: MouseEvent) => void;
    initTransformer: () => void;
    cleanupListeners: () => void;
};
