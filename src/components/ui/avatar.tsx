import cn from 'classnames';
import Image from '@components/ui/image';
import { productImageLoader, reviewImageLoader } from '@utils/image-loader';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { ImageLoaderProps } from 'next/image';

type AvatarProps = {
  className?: string;
  src: string;
  title: string;
  loader: (p: ImageLoaderProps) => string;
  [key: string]: unknown;
};

const Avatar: React.FC<AvatarProps> = ({ src, className, title, loader, ...rest }) => {
  return (
    <div
      {...rest}
    >
      {/* {item.review_images && item.review_images.length > 0 ? item?.review_images[0]?.image_name : "/icons/apple-icon-180.png"} */}
      {src ?
        <Image loader={loader} className={cn(
          className
        )} alt={title || "Product image"} objectFit="cover" priority={true} src={src} width={30} height={30} /> : <Image width={30} height={30} className={cn(
          className
        )} alt={title || "Product image"} src={"/icons/apple-icon-180.png"} />
      }
    </div>
  );
};

export default Avatar;
