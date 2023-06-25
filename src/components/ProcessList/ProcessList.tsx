import Process from "./Process/Process";
import "./style.scss";
import { useContext } from 'react'
import { ProcessProvider } from '../../Providers/ProcessProvider'

export default function ProcessList() {
  
  const processValues = useContext(ProcessProvider)
  return (
    <div className="process-list">
      <h2>Processos</h2>
      <div className="list-container">
        {processValues.processData.map((item:Array<any>, index:number) => {
                return(
                    <Process data={item} />
                )}
                )
            }
      </div>
      <button className="btn confirm align-end ">Iniciar</button>
    </div>
  );
}
