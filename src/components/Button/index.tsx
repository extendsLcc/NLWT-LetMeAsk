import { ButtonHTMLAttributes } from 'react'

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Index(props: ButtonProps) {
  return (
    <button className="button" {...props} />
  );
}