import { useProcessDataStore } from "../../store";
import Process from "./Process/Process";
import "./style.scss";

export default function ProcessList() {
  const processData = useProcessDataStore();

  return (
    <div className="process-list">
      <h2>Processos</h2>
      <div className="list-container">
        <Process />
        <Process />
        <Process />
      </div>
      <button className="btn confirm align-end ">Iniciar</button>
    </div>
  );
}
