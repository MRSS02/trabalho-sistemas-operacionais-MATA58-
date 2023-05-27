import Process from "../Process/Process";
import "./style.scss";

export default function ProcessList() {
  return (
    <div className="process-list">
      <h2>Processos</h2>
      <div className="process-list__container">
        <Process />
        <Process />
        <Process />
      </div>
    </div>
  );
}
