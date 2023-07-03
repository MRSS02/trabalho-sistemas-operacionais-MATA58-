import { useContext, useEffect, useState } from "react";
import "./style.scss";
import { ProcessProvider } from "../../Providers/ProcessProvider";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

interface IPage {
  id: number;
  size: number;
  color: string;
  state: string;
}

function RenderTable(size: number, pages: IPage[]) {
  let cells = [];

  const { cellsPages, counter } = renderPages(pages);

  cells.push(cellsPages);

  for (let i = counter; i < size; i++) {
    cells.push(
      <div className="cell">
        <span>{i}</span>
      </div>
    );
  }

  return cells;
}

function renderPages(pages: IPage[]) {
  const cellsPages = [] as any;

  let counter = 1;

  pages.forEach((page) => {
    for (let i = 0; i < page.size; i++) {
      cellsPages.push(
        <div className="cell">
          <span>{counter++}</span>
          <div className="fill" style={{ backgroundColor: page.color }}></div>
        </div>
      );
    }
  });

  return {
    cellsPages,
    counter,
  };
}

class Ram {
  size: number;
  RamJSX: any;
  currentProcesses: any;

  constructor(size: number) {
    this.size = size;
    this.RamJSX = this.render();
    this.currentProcesses = [];
  }

  render(): any {
    let cells = [];

    for (let i = 0; i < this.size; i++) {
      cells.push(
        <div className="cell">
          <span>{i + 1}</span>
        </div>
      );
    }

    return (this.RamJSX = cells);
  }

  insertProcess(page: any): any {
    const current = [...this.currentProcesses, page];
    this.currentProcesses = current;

    const currentSize = current.reduce((acc: any, curr: any) => {
      return acc + curr.size;
    }, 0);

    let cells = [] as any;

    let counter = 1;

    for (let i = 0; i < this.size; i++) {
      if (i < currentSize) {
        current.forEach((process: any) => {
          cells.push(
            <div className="cell">
              <span>{counter++}</span>
              <div
                className="fill"
                style={{ backgroundColor: process.color }}
              ></div>
            </div>
          );
        });
      } else {
        cells.push(
          <div className="cell">
            <span>{i + 1}</span>
          </div>
        );
      }
    }

    return (this.RamJSX = cells);
  }

  removeProcess(page: any): any {
    let cells = [];

    for (let i = 0; i < this.size; i++) {
      cells.push(
        <div className="cell">
          <span>{i + 1}</span>
        </div>
      );
    }

    return (this.RamJSX = cells);
  }
}

export default function Memory() {
  const ram = new Ram(32);
  const [ramState, setRamState] = useState(ram);

  const data = useContext(ProcessProvider);

  const pages = data.processData.map((process, index) => {
    if (process.state !== "a caminho") {
      return {
        id: index,
        size: process.pages,
        color: colors[index],
        state: process.state,
      };
    } else {
      return {
        id: index,
        size: 0,
        color: colors[index],
        state: process.state,
      };
    }
  });

  useEffect(() => {
    pages.map((page) => {
      ram.insertProcess(pages[page.id]);
      setRamState(ram);
    });
  }, [data.processData]);

  return (
    <div className="memory-container">
      <div className="ram">
        <h2>Memória de Ram</h2>
        <div className="table">{ramState.RamJSX}</div>
      </div>

      <button
        onClick={() => {
          ram.insertProcess(pages[1]);
          setRamState(ram);
        }}
      >
        Teste
      </button>

      <div className="disco">
        <h2>Memória de Disco</h2>
        <div className="table">{RenderTable(64, pages)}</div>
      </div>
    </div>
  );
}
