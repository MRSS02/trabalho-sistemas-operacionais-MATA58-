import "./style.scss";

const cellListRam = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50,
];

const cellListDisc = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
];

export default function Memory() {
  return (
    <div className="memory">
      <div className="ram">
        <h2>Memória RAM</h2>
        <div className="table">
          {cellListRam.map((cell) => {
            return <MemoryCell key={cell} cell={cell} />;
          })}
        </div>
      </div>

      <div className="disc">
        <h2>Disco</h2>
        <div className="table">
          {cellListDisc.map((cell) => {
            return <MemoryCell key={cell} cell={cell} />;
          })}
        </div>
      </div>
    </div>
  );
}

const MemoryCell = (props: any) => {
  return (
    <div className="cell">
      <span>{props.cell}</span>
    </div>
  );
};
