import React, { FC, HTMLInputTypeAttribute } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import "./index.css";
import clsx from "clsx";

interface IProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | undefined;
}
function Input<T extends FieldValues>({
  label,
  placeholder,
  type,
  ...props
}: IProps & UseControllerProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController(props);
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        id={props.name}
        {...field}
        className={clsx("input-custom", { "!border-red-500": !!error })}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
