import "./style.scss";
import { useContext } from 'react'
import { ProcessProvider } from "../../../Providers/ProcessProvider"
import { ProcessDataType, ProcessProps } from '../../../types'

export default function Process({ data, index }: ProcessProps) {

  const processValues = useContext(ProcessProvider)
  
  return (
    <div className="process">
      <h2>P{index}</h2>
      <div className={`box ${processValues.processData[index].state === 'executando' ? 
      "green" : (processValues.processData[index].state === 'espera' ? "black" : "red")} 
      align-end`}/>
      <div className="process__element">
        <label>Tempo de chegada</label>
            { processValues.processData[index].arriveTime }
        <div className="line"></div>
      </div>
      <div className="process__element">
        <label>Tempo de execução</label>
            { processValues.processData[index].executionTime }
        <div className="line"></div>
      </div> 
      <div className="process__element">
        <label>Deadline</label>
            { processValues.processData[index].deadline }
        <div className="line"></div>
      </div>
      <div className="process__element">
        <label>Páginas</label>
            { processValues.processData[index].pages }
        </div>
      {processValues.processData[index].brokeDeadline && 
      <h3 className="red-text">QUEBROU DEADLINE</h3>}
    </div>
  );
}
