import { Button, type ButtonProps } from "@heroui/react";

export default function BaseButton({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      {...props}
      className={`${className} !normal-case !rounded-base text-base-gray`}
    >
      {children}
    </Button>
  );
}
