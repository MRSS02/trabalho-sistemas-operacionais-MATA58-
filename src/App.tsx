import Chart from "./components/Chart/Chart";
import Header from "./components/Header/Header";
import Memory from "./components/Memory/Memory";
import ProcessList from "./components/ProcessList/ProcessList";
import { useInitialDataStore } from "./store";

export default function App() {
  const initialDataLock = useInitialDataStore((state) => state.initialDataLock);
  const numeroDeProcessos = useInitialDataStore(
    (state) => state.numeroDeProcessos
  );

  return (
    <main className="container">
      <Header />
      {initialDataLock && <ProcessList numeroDeProcessos={numeroDeProcessos} />}
      <Chart />
      <Memory />
    </main>
  );
}
