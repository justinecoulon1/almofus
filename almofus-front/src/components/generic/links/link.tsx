import { Link } from '@/i18n/routing';
import styles from './links.module.css';

interface CompleteGenericLinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  linkStyle: string;
  label: string;
  href: string;
}

interface LinkProps extends Omit<CompleteGenericLinkProps, 'linkStyle'> { }

export function SecondaryLink(props: LinkProps) {
  return <GenericLink linkStyle={styles.secondaryLink} {...props} />;
}

export function PrimaryLink(props: LinkProps) {
  return <GenericLink linkStyle={styles.primaryLink} {...props} />;
}

export function GenericLink({
  linkStyle,
  label,
  href,
  ...linkProps
}: CompleteGenericLinkProps) {
  return (
    <Link {...linkProps} className={linkStyle} href={href}>
      {label}
    </Link>
  );
}