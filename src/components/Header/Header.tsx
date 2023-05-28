import "./style.scss";
import { useInitialDataStore } from "../../store";

export default function Header() {
  const {
    numeroDeProcessos,
    sobrecarga,
    quantum,
    escalonameto,
    setNumeroDeProcessos,
    setSobrecarga,
    setQuantum,
    setEscalonamento,
    initialDataLock,
    setInitialDataLock,
  } = useInitialDataStore();

  return (
    <div className="header">
      <h2>Informe os Dados</h2>
      <div className="header__inputs">
        <input
          type="number"
          value={numeroDeProcessos}
          onChange={(e) => setNumeroDeProcessos(Number(e.target.value))}
          disabled={initialDataLock}
        />
        <label>Nº de Processos</label>

        <input
          type="number"
          value={sobrecarga}
          onChange={(e) => setSobrecarga(Number(e.target.value))}
          disabled={initialDataLock}
        />
        <label>Sobrecarga</label>

        <input
          type="number"
          value={quantum}
          onChange={(e) => setQuantum(Number(e.target.value))}
          disabled={initialDataLock}
        />
        <label>Quantum</label>
      </div>

      <div className="header__buttons">
        <button
          className={`btn ${escalonameto === "FIFO" ? "active" : ""}`}
          onClick={() => setEscalonamento("FIFO")}
          disabled={initialDataLock}
        >
          FIFO
        </button>
        <button
          className={`btn ${escalonameto === "SJF" ? "active" : ""}`}
          onClick={() => setEscalonamento("SJF")}
          disabled={initialDataLock}
        >
          SJF
        </button>
        <button
          className={`btn ${escalonameto === "Round Robin" ? "active" : ""}`}
          onClick={() => setEscalonamento("Round Robin")}
          disabled={initialDataLock}
        >
          Round Robin
        </button>
        <button
          className={`btn ${escalonameto === "EDF" ? "active" : ""}`}
          onClick={() => setEscalonamento("EDF")}
          disabled={initialDataLock}
        >
          EDF
        </button>
      </div>

      <div className="align-end">
        <button onClick={() => setInitialDataLock(false)} className="btn clear">
          Limpar
        </button>
        <button
          onClick={() => setInitialDataLock(true)}
          className="btn confirm ml-1"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
