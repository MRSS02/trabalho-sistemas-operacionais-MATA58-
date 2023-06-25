import "./style.scss";
import { useContext } from 'react'
import { ProcessProvider } from "../../../Providers/ProcessProvider"
import { ProcessDataType, ProcessProps } from '../../../types'

export default function Process({ data, index }: ProcessProps) {

  const processValues = useContext(ProcessProvider)

  console.log("aaaaa", index)
 
  return (
    <div className="process">
      <h2>P{index}</h2>

      <div className="process__element">
        <label>Tempo de chegada</label>
        <input type="number"
            onChange={(e) => 
            {
                const processDataCopy = [...processValues.processData]
                processDataCopy[index].arriveTime = Number(e.target.value)
                processValues.setProcessData(processDataCopy)
                console.log(processValues.processData[index])
            }}

        />
        <div className="line"></div>
      </div>
      <div className="process__element">
        <label>Tempo de execução</label>
        <input type="number"
             onChange={(e) => 
            {
                const processDataCopy = [...processValues.processData]
                processDataCopy[index].executionTime = Number(e.target.value)
                processValues.setProcessData(processDataCopy)
            }}

        />
        <div className="line"></div>
      </div> 
      <div className="process__element">
        <label>Deadline</label>
        <input type="number"
        onChange={(e) => 
            {
                const processDataCopy = [...processValues.processData]
                processDataCopy[index].deadline = Number(e.target.value)
                processValues.setProcessData(processDataCopy)
            }        
            }
        />
        <div className="line"></div>
      </div>
      <div className="process__element">
        <label>Páginas</label>
        <input type="number" 
        onChange={(e) => 
            {
                const processDataCopy = [...processValues.processData]
                processDataCopy[index].pages = Number(e.target.value)
                processValues.setProcessData(processDataCopy)
            }
            }/>
      </div>
    </div>
  );
}
