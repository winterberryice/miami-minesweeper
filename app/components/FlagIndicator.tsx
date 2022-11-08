import { Flag } from "./icons";

export function FlagIndicator({
  remainingFlags,
}: {
  remainingFlags: number;
}): JSX.Element {
  return (
    <div className="flex">
      <div style={{ height: "20px", width: "20px" }}>
        <Flag />
      </div>
      <div className="pl-2 pr-4">{remainingFlags}</div>
    </div>
  );
}
