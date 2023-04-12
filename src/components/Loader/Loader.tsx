import { memo } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface IProps {
  loading: boolean;
  className?: string;
  color: string;
}

export const Loader = memo(({ loading, className, color }: IProps) => {
  return (
    <ClipLoader
      className={className}
      color={color}
      loading={loading}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
});
