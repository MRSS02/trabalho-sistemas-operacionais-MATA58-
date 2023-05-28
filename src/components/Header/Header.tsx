import "./style.scss";
import { useInitialDataStore } from "../../store";

export default function Header() {
  const numeroDeProcessos = useInitialDataStore(
    (state) => state.numeroDeProcessos
  );
  const setNumeroDeProcessos = useInitialDataStore(
    (state) => state.setNumeroDeProcessos
  );

  return (
    <div className="header">
      <h2>Informe os Dados</h2>
      <div className="header__inputs">
        <input
          type="number"
          value={numeroDeProcessos}
          onChange={(e) => setNumeroDeProcessos(Number(e.target.value))}
        />
        <label>Nº de Processos</label>

        <input type="number" />
        <label>Sobrecarga</label>

        <input type="number" />
        <label>Quantum</label>
      </div>

      <div className="header__buttons">
        <button className="btn ">FIFO</button>
        <button className="btn ">SJF</button>
        <button className="btn ">Round Robin</button>
        <button className="btn ">EDF</button>
      </div>

      <button className="btn confirm align-end ">Confirmar</button>
    </div>
  );
}
