import { forwardRef, useLayoutEffect, useMemo, useState } from "react";

import style from "./Image.module.sass";


export type TImageProps = {
  src: string;
  imsize?: 'cover' | 'contain';
  minSrc?: string;
  minSize?: number;
} & Omit<JSX.IntrinsicElements['div'], 'ref'>;

export const Image = forwardRef<HTMLDivElement, TImageProps>(
  (
    {
      className = '',
      children,
      src,
      minSize = 1024,
      minSrc = src ? src + '?size=' + minSize : null,
      imsize = 'cover',
      ...props
    },
    ref
  ) => {
    const [isLoad, setIsLoad] = useState(false);
    const [isMinLoad, setIsMinLoad] = useState(false);
    const minImg = useMemo(() => new window.Image(), []);
    const maxImg = useMemo(() => new window.Image(), []);

    useLayoutEffect(() => {
      if (!src) return;

      setIsLoad(true);
      setIsMinLoad(true);

      minImg.onload = () => {
        setIsMinLoad(false);
      };

      maxImg.onload = () => {
        setIsLoad(false);
      };

      minImg.src = minSrc!;
      maxImg.src = src!;
    }, [src]);

    return (
      <div
        ref={ref}
        style={{ backgroundImage: !isLoad ? `url(${src})` : undefined }}
        className={`${style.image} ${className}`}
        {...props}
      >
        {
          isLoad && (
            <>
              <div
                className={style.minImage}
                style={{ backgroundImage: !isMinLoad ? `url(${minSrc})` : undefined }} />

              <div className={style.loader}>
                {children}
              </div>
            </>
          )
        }
      </div>
    );
  }
)

