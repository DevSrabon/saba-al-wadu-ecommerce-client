import { NextSeo, NextSeoProps } from 'next-seo';

interface SeoProps extends NextSeoProps {
  path: string;
}

const Seo = ({ title, description, path }: SeoProps) => {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${path}`,
        title,
        description,
        images: [
          {
            url: '/assets/images/me_form.webp',
            width: 800,
            height: 600,
            alt: 'Saba al wadu logo',
          },
          {
            url: '/assets/images/me_form.webp',
            width: 900,
            height: 800,
            alt: 'Saba al wadu logo',
          },
        ],
      }}
    />
  );
};

export default Seo;
