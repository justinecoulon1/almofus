import { Link } from '@/i18n/routing';

export function GenericLink({ style, label, href }: { style: string; label: string; href: string }) {
  return (
    <Link className={style} href={href}>
      {label}
    </Link>
  );
}
