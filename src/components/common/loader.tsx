import { CircularProgress, type CircularProgressProps } from "@heroui/progress";
export default function Loader(props: CircularProgressProps) {
  return <CircularProgress {...props} color="warning" />;
}
