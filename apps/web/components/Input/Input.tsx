import { FC, forwardRef, InputHTMLAttributes } from "react";
import ExclamationCircleIcon from "@heroicons/react/20/solid/ExclamationCircleIcon";
import { cx } from "class-variance-authority";
import * as styles from "./styles";

type InputProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, id, className, error, ...props }, ref) {
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            {...props}
            id={id}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cx(styles.input({ error: !!error }))}
            ref={ref}
          />
          {error ? (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          ) : null}
        </div>
        {error ? (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);
