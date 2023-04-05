import { useWindowSize } from "hooks";
import "./styles.scss";

interface Props {
  primary?: boolean;
  size?: "small" | "medium" | "large";
}

export const TableHead = ({ primary, size }: Props) => {
  const { width = 0 } = useWindowSize();

  const mode = primary ? "table__head--primary" : "table__head--secondary";

  return (
    <thead className={["table__head", `table__head--${size}`, mode].join(" ")}>
      <tr>
        {width > 768 && <th>Rank</th>}
        <th>Name</th>
        <th>Price</th>
        {width > 768 && <th>Market Cap</th>}
        {width > 1024 && (
          <>
            <th>VWAP (24Hr)</th>
            <th>Supply</th>
          </>
        )}
        {width > 768 && <th>Volume (24Hr)</th>}
        <th>Change (24Hr)</th>
        <th>Add</th>
      </tr>
    </thead>
  );
};
