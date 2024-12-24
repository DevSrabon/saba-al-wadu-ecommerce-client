import Image from 'next/image';
import Link from '@components/ui/link';
import cn from 'classnames';
import { siteSettings } from '@settings/site-settings';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  href = siteSettings.logo.href,
  ...props
}) => {
  return (
    <Link
      href={href}
      className={cn(' focus:outline-none w-auto md:w-32 lg:w-72', className)}
      {...props}
    >
      {/* <p className="text-2xlfont-semibold text-brand-dark text-center">
        Saba al wadu
      </p> */}
      <div className="flex justify-center items-center ">
        {' '}
        <Image
          height={80}
          src={siteSettings.logo.url}
          alt={siteSettings.logo.alt}
          priority
          loading="eager"
        />
      </div>
    </Link>
  );
};

export default Logo;
