import Image from "next/image";

type LogoLockupProps = {
  href: string;
  className: string;
  logoClassName: string;
  taglineClassName: string;
};

export default function LogoLockup({
  href,
  className,
  logoClassName,
  taglineClassName,
}: LogoLockupProps) {
  return (
    <a href={href} className={className} aria-label="Auxgens home">
      <Image
        src="/logo_3d.gif"
        alt="Auxgens"
        width={360}
        height={360}
        className={logoClassName}
        priority
        unoptimized
      />
      <span className={`${taglineClassName} logo-tagline-stack`} aria-hidden="true">
        <Image
          src="/logo-tagline-top.svg"
          alt=""
          width={432}
          height={33}
          className="logo-tagline-line"
          priority
        />
        <Image
          src="/logo-tagline-bottom.svg"
          alt=""
          width={446}
          height={33}
          className="logo-tagline-line"
          priority
        />
      </span>
    </a>
  );
}
