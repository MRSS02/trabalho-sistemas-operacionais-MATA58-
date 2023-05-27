import "./style.scss";

export default function Header() {
  return (
    <div className="header">
      <h2>Informe os Dados</h2>
      <div className="header__inputs">
        <input type="number" />
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
