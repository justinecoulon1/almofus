import React from 'react';
import styles from '@/components/generic/inputs/input.module.css';

interface CompleteGenericInputProps {
  labelText: string;
  inputType: string;
  inputName: string;
  inputDivStyle: string;
  inputStyle: string;
  labelStyle: string;
  inputValue: string;
  onInputValueChange: (newValue: string) => void;
}

interface GenericInputProps {
  labelText: string;
  inputType: string;
  inputName: string;
  inputValue: string;
  onInputValueChange: (newValue: string) => void;
}

export function TertiaryGlowingInput(props: GenericInputProps) {
  return (
    <GenericInput inputDivStyle={styles.inputDiv} labelStyle={styles.label} inputStyle={styles.input} {...props} />
  );
}

export function GenericInput({
  labelText,
  inputType,
  inputName,
  inputDivStyle,
  inputStyle,
  labelStyle,
  inputValue,
  onInputValueChange,
}: CompleteGenericInputProps) {
  return (
    <div className={inputDivStyle}>
      <label className={labelStyle} htmlFor={inputName}>
        {labelText}
      </label>
      <input
        className={inputStyle}
        type={inputType}
        name={inputName}
        id={inputName}
        value={inputValue}
        onChange={(e) => onInputValueChange(e.target.value)}
      />
    </div>
  );
}
