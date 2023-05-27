import { useBearStore } from "./store";

export default function App() {
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);

  return (
    <div>
      <h1>hello world</h1>
      <h2>{bears}</h2>
      <button onClick={increasePopulation} />
    </div>
  );
}
