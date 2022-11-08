import { Timer } from "./icons";

export function TimerIndicator({
  elapsedTime,
}: {
  elapsedTime: number;
}): JSX.Element {
  return (
    <div className="flex justify-end">
      <div className="pr-2">{elapsedTime}</div>
      <div style={{ height: "20px", width: "20px" }}>
        <Timer />
      </div>
    </div>
  );
}
