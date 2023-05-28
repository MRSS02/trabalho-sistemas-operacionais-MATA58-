import "./style.scss";

export default function Chart() {
  return (
    <div className="chart-container">
      <h2>Escalonamento</h2>

      <div className="chart">
        <div className="chart__aside">
          <div className="top">
            <div className="grid"></div>
          </div>
          <div className="bottom">
            <div className="tempo-de-chegada">TC</div>
            <div className="tempo-de-execucao">TE</div>
            <div className="deadline">D</div>
            <div className="numero-do-processo">N°</div>
          </div>
        </div>

        <div className="chart__main"></div>
      </div>

      <footer>
        <div className="turnaround">Turnaround: X</div>
        <div className="legends">
          <div className="box green" />
          Executando
          <div className="box red" />
          Sobrecarga
          <div className="box black" />
          Deadline
        </div>
      </footer>
    </div>
  );
}
