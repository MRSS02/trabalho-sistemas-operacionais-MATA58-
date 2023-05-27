import Header from "./components/Header/Header";
import Memory from "./components/Memory/Memory";
import ProcessList from "./components/ProcessList/ProcessList";

export default function App() {
  return (
    <main className="container">
      <Header />
      <ProcessList />
      <Memory />
    </main>
  );
}
