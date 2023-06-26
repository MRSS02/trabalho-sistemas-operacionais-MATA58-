import "./style.scss";
import { useEffect, useContext } from 'react';
import { ProcessProvider } from '../../Providers/ProcessProvider'
import { ProcessDataType } from '../../types'
import Process from './Process'

export default function Chart() {  
   
   const processValues = useContext(ProcessProvider)

   return (
    <div className="chart-container">
      <h2>Escalonamento</h2>

      <h3>Tempo: { processValues.time }</h3>
      <div className="chart">
        <div className="chart__aside">
          <div className="top">
            
            <div className="grid">
                
            </div>
          </div>
          <div className="bottom">
            <div className="tempo-de-chegada">TC</div>
            <div className="tempo-de-execucao">TE</div>
            <div className="deadline">D</div>
            <div className="numero-do-processo">N°</div>
          </div>
        </div>

        <div className="chart__main"></div>
      </div>

      <div className="list-container">
        {processValues.processData.map((item:ProcessDataType, index:number) => {
                 
                return(
                    <Process data={item} index={index} />
                )}
                )
            }
      </div>

      <footer>
        <div className="turnaround">Turnaround Médio: X</div>
        <div className="legends">
          <div className="box green" />
          Executando
          <div className="box red" />
          Sobrecarga
          <div className="box black" />
          Deadline
        </div>
      </footer>
      
    </div>
  );
}
