import { useContext, useEffect, useState } from "react";
import "./style.scss";
import { ProcessProvider } from "../../Providers/ProcessProvider";

const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "black",
];

interface IPage {
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

function currentUsage(pages: IPage[]) {
  return pages.reduce((acc, page) => {
    return acc + page.size;
  }, 0);
}

export default function Memory() {
  const [hasChanged, setHasChanged] = useState({} as IPage);

  const [trackLRU, setTrackLRU] = useState([] as IPage[]);

  const [ramState, setRamState] = useState({
    size: 50,
    pages: [] as IPage[],
  });

  const data = useContext(ProcessProvider);

  const algoritmo = data.algoritmoMemoria;

  const pages = data.processData.map((process, index) => {
    if (process.state !== "a caminho") {
      return {
        size: process.pages,
        color: colors[index],
        state: process.state,
      };
    } else {
      return {
        size: 0,
        color: colors[index],
        state: process.state,
      };
    }
  });

  const currentExecution = pages.find((page) => page.state === "executando");

  useEffect(() => {
    if (algoritmo === "FIFO") {
      if (currentExecution) {
        // mudança de execução
        if (hasChanged.color !== currentExecution.color) {
          // já na ram
          if (
            ramState.pages.find(
              (page) => page.color === currentExecution.color
            ) !== undefined
          ) {
            return;
          }

          if (
            currentUsage(ramState.pages) + currentExecution.size >
            ramState.size
          ) {
            const pagesRemovedPages = ramState.pages;
            pagesRemovedPages.shift();
            setRamState((prev) => {
              return {
                ...prev,
                pages: pagesRemovedPages,
              };
            });
            return;
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
    }

    if (algoritmo === "LRU") {
      if (currentExecution) {
        if (hasChanged.color !== currentExecution.color) {
          // já na ram
          if (
            ramState.pages.find(
              (page) => page.color === currentExecution.color
            ) !== undefined
          ) {
            return;
          }
          // verificar se a página já está na lista do LRU, se estive coloca no topo
          if (
            trackLRU.find((page) => page.color === currentExecution.color) ===
            undefined
          ) {
            setTrackLRU((prev) => {
              return [...prev, currentExecution];
            });
          } else {
            // colocar a página no topo da lista
            const index = trackLRU.findIndex(
              (page) => page.color === currentExecution.color
            );
            const page = trackLRU[index];
            trackLRU.splice(index, 1);
            trackLRU.unshift(page);
          }

          if (
            currentUsage(ramState.pages) + currentExecution.size >
            ramState.size
          ) {
            const pageToRemove = trackLRU.find((page) => {
              return (
                ramState.pages.find(
                  (ramPage) => ramPage.color === page.color
                ) === undefined
              );
            });

            setRamState((prev) => {
              return {
                ...prev,
                pages: prev.pages.filter(
                  (page) => page.color !== pageToRemove?.color
                ),
              };
            });
            return;
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
    }
  }, [pages]);

  return (
    <div className="memory-container">
      <small>Obs: Cada bloco representa uma página de 4k</small>
      {JSON.stringify(trackLRU)}
      <div className="ram">
        <h2>Memória de Ram</h2>
        <div className="table">{RenderTable(51, ramState.pages)}</div>
      </div>

      <div className="disco">
        <h2>Memória de Disco</h2>
        <div className="table">{RenderTable(151, pages)}</div>
      </div>
    </div>
  );
}
