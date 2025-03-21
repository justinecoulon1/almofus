import styles from './buttons.module.css';
import classNames from 'classnames';

interface CompleteGenericButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle: string;
  label: string;
}

interface ButtonProps extends Omit<CompleteGenericButtonProps, 'buttonStyle'> {}

export function SecondaryButton(props: ButtonProps) {
  return <GenericButton buttonStyle={styles.secondaryButton} {...props} />;
}

export function PrimaryButton(props: ButtonProps) {
  return <GenericButton buttonStyle={styles.primaryButton} {...props} />;
}

export function GenericButton({ buttonStyle, label, ...buttonProps }: CompleteGenericButtonProps) {
  return (
    <button {...buttonProps} className={classNames(buttonStyle, buttonProps.className)}>
      {label}
    </button>
  );
}
