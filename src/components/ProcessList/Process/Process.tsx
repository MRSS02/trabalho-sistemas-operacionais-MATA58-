import "./style.scss";

export default function Process({data}: any) {
  return (
    <div className="process">
      <h2>P1</h2>

      <div className="process__element">
        <label>Tempo de chegada</label>
        <input type="number" />
        <div className="line"></div>
      </div>
      <div className="process__element">
        <label>Tempo de execução</label>
        <input type="number" />
        <div className="line"></div>
      </div>
      <div className="process__element">
        <label>Deadline</label>
        <input type="number" />
        <div className="line"></div>
      </div>
      <div className="process__element">
        <label>Páginas</label>
        <input type="number" />
      </div>
    </div>
  );
}
