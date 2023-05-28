import "./style.scss";

export default function Chart() {
  return (
    <div className="chart-container">
      <div className="chart">
        <div className="chart__aside"></div>
        <div className="chart__main"></div>
      </div>

      <footer>
        <div className="turnaround">Turnaround: X</div>
        <div className="legends">
          <div className="box green"></div>
          Executando
          <div className="box red"></div>
          Sobrecarga
          <div className="box black"></div>
          Deadline
        </div>
      </footer>
    </div>
  );
}
