export const categoryImageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMG_URL}/${src}`;
};
export const productImageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMG_URL}/${src}`;
};
export const reviewImageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMG_URL}/${src}`;
};
