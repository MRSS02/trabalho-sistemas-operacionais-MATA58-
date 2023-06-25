import "./style.scss";
import { useContext } from 'react'
import { useInitialDataStore } from "../../store";
import { ProcessProvider } from "../../Providers/ProcessProvider"  


export default function Header() {

   const processValues = useContext(ProcessProvider)

  return (
    <div className="header">
      <h2>Informe os Dados</h2>
      <div className="header__inputs">
        <input
          type="number"
          value={processValues.numeroDeProcessos}
          onChange={(e) => processValues.setNumeroDeProcessos(Number(e.target.value))}
          disabled={processValues.processStart}
        />
        <label>Nº de Processos</label>

        <input
          type="number"
          value={processValues.sobrecarga}
          onChange={(e) => processValues.setSobrecarga(Number(e.target.value))}
          disabled={processValues.processStart}
        />
        <label>Sobrecarga</label>

        <input
          type="number"
          value={processValues.quantum}
          onChange={(e) => processValues.setQuantum(Number(e.target.value))}
          disabled={processValues.processStart}
        />
        <label>Quantum</label>
      </div>

      <div className="header__buttons">
        <button
          className={`btn ${processValues.escalonamento === "FIFO" ? "active" : ""}`}
          onClick={() => processValues.setEscalonamento("FIFO")}
          disabled={processValues.processStart}
        >
          FIFO
        </button>
        <button
          className={`btn ${processValues.escalonamento === "SJF" ? "active" : ""}`}
          onClick={() => processValues.setEscalonamento("SJF")}
          disabled={processValues.processStart}
        >
          SJF
        </button>
        <button
          className={`btn ${processValues.escalonamento === "Round Robin" ? "active" : ""}`}
          onClick={() => processValues.setEscalonamento("Round Robin")}
          disabled={processValues.processStart}
        >
          Round Robin
        </button>
        <button
          className={`btn ${processValues.escalonamento === "EDF" ? "active" : ""}`}
          onClick={() => processValues.setEscalonamento("EDF")}
          disabled={processValues.processStart}
        >
          EDF
        </button>
      </div>

      <div className="align-end">
        <button onClick={() => processValues.setProcessStart(false)} className="btn clear">
          Limpar
        </button>
        <button
          onClick={() => processValues.setProcessStart(true)}
          className="btn confirm ml-1"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
