import "./style.scss";
import { useContext } from "react";
import { useInitialDataStore } from "../../store";
import { ProcessProvider } from "../../Providers/ProcessProvider";

export default function Header({ onReset }: any) {
  const processValues = useContext(ProcessProvider);

  function startExecution() {
    let processes: Array<any> = [];
    for (let i = 0; i < processValues.numeroDeProcessos; i++) {
      processes.push({
        state: "a caminho",
        ownQuantum: processValues.quantum,
        arriveTime: 0,
        overload: 0,
        executionTime: 0,
        deadline: 0,
        pages: 0,
        brokeDeadline: false,
        turnaround: 0,
      });
    }
    processValues.setProcessData(processes);
    processValues.setProcessSelection(true);
  }

  function stopExecution() {
    window.location.reload();
    /* onReset()
         processValues.setProcessSelection(false)
         processValues.setProcessStart(false) 
         processValues.setTime(1)
         processValues.setProcessData([])
         processValues.setNumeroDeProcessos(0)
         processValues.setSobrecarga(0)
         processValues.setQuantum(0)
         processValues.setSobrecarga(0)
         processValues.setEscalonamento("FIFO")
         processValues.setProcessData([])
         processValues.setMemoryMap([])
         processValues.setDiskTable([])
         processValues.setExecutionHistory([]) */
  }

  return (
    <div className="header">
      <h2>Informe os Dados</h2>
      <div className="header__inputs">
        <input
          type="number"
          value={processValues.numeroDeProcessos}
          onChange={(e) =>
            processValues.setNumeroDeProcessos(Number(e.target.value))
          }
          disabled={processValues.processSelection}
        />
        <label>Nº de Processos</label>

        <input
          type="number"
          value={processValues.sobrecarga}
          onChange={(e) => processValues.setSobrecarga(Number(e.target.value))}
          disabled={processValues.processSelection}
        />
        <label>Sobrecarga</label>

        <input
          type="number"
          value={processValues.quantum}
          onChange={(e) => processValues.setQuantum(Number(e.target.value))}
          disabled={processValues.processSelection}
        />
        <label>Quantum</label>
      </div>

      <div className="header__buttons">
        <button
          className={`btn ${
            processValues.escalonamento === "FIFO" ? "active" : ""
          }`}
          onClick={() => processValues.setEscalonamento("FIFO")}
          disabled={processValues.processSelection}
        >
          FIFO
        </button>
        <button
          className={`btn ${
            processValues.escalonamento === "SJF" ? "active" : ""
          }`}
          onClick={() => processValues.setEscalonamento("SJF")}
          disabled={processValues.processSelection}
        >
          SJF
        </button>
        <button
          className={`btn ${
            processValues.escalonamento === "Round Robin" ? "active" : ""
          }`}
          onClick={() => processValues.setEscalonamento("Round Robin")}
          disabled={processValues.processSelection}
        >
          Round Robin
        </button>
        <button
          className={`btn ${
            processValues.escalonamento === "EDF" ? "active" : ""
          }`}
          onClick={() => processValues.setEscalonamento("EDF")}
          disabled={processValues.processSelection}
        >
          EDF
        </button>
      </div>

      <div className="header__buttons">
        <h3>Algoritmos da memória:</h3>
        <button
          className={`btn ${
            processValues.algoritmoMemoria === "FIFO" ? "active" : ""
          }`}
          onClick={() => processValues.setalgoritmoMemoria("FIFO")}
          disabled={processValues.processSelection}
        >
          FIFO
        </button>
        <button
          className={`btn ${
            processValues.algoritmoMemoria === "LRU" ? "active" : ""
          }`}
          onClick={() => processValues.setalgoritmoMemoria("LRU")}
          disabled={processValues.processSelection}
        >
          LRU
        </button>
      </div>

      <div className="align-end">
        <button onClick={stopExecution} className="btn clear">
          Limpar
        </button>
        <button onClick={startExecution} className="btn confirm ml-1">
          Confirmar
        </button>
      </div>
    </div>
  );
}
