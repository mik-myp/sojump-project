declare module 'react-sticky-box' {
  import type { ComponentType, CSSProperties, ReactNode } from 'react';

  export interface StickyBoxProps {
    children?: ReactNode;
    offsetTop?: number;
    offsetBottom?: number;
    className?: string;
    style?: CSSProperties;
  }

  const StickyBox: ComponentType<StickyBoxProps>;
  export default StickyBox;
}
