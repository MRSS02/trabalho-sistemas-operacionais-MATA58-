import "./style.scss";

export default function Header() {
  return (
    <div className="header">
      <h2>Informe os Dados</h2>
      <div>
        <HeaderInputs />
        <HeaderInputs />
        <HeaderInputs />
        <HeaderInputs />
      </div>

      <div>
        <button className="btn ">FIFO</button>
        <button className="btn ">SJF</button>
        <button className="btn ">Round Robin</button>
        <button className="btn ">EDF</button>
      </div>

      <button className="btn confirm">Confirmar</button>
    </div>
  );
}

const HeaderInputs = () => {
  return (
    <>
      <label>Prop</label>
      <input type="text" />
    </>
  );
};
