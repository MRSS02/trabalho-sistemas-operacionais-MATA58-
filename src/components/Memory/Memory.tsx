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

  pages?.forEach((page) => {
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

export default function Memory() {
  // const [ramState, setRamState] = useState<IPage[]>([]);

  const [hasChanged, setHasChanged] = useState({} as IPage);

  const [ramState, setRamState] = useState({
    size: 32,
    pages: [] as IPage[],
    currentUsage: (pages: IPage[]) => {
      return pages.reduce((acc, page) => {
        return acc + page.size;
      }, 0);
    },
  });

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

  const currentExecution = pages.find((page) => page.state === "executando");

  useEffect(() => {
    if (currentExecution) {
      if (hasChanged.color !== currentExecution.color) {
        if (
          ramState.currentUsage(ramState.pages) + currentExecution.size >
          32
        ) {
          setRamState((prev) => {
            const pagesRemovedPages = prev.pages;
            pages.shift();
            return {
              ...prev,
              pages: pagesRemovedPages,
            };
          });
        }

        setRamState((prev) => {
          return {
            ...prev,
            pages: [...prev.pages, currentExecution],
          };
        });
        setHasChanged(currentExecution);
      }
    }
  }, [pages]);

  return (
    <div className="memory-container">
      <div className="ram">
        <h2>Memória de Ram</h2>
        <div className="table">{RenderTable(33, ramState.pages)}</div>
      </div>

      <div className="disco">
        <h2>Memória de Disco</h2>
        <div className="table">{RenderTable(65, pages)}</div>
      </div>
    </div>
  );
}
