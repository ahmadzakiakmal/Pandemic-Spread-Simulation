import Image from "next/image";
import { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";

function GridBox({ value, showVisuals, index, grid, cols }) {
  return (
    <div
      className={
        "w-[80px] !aspect-square relative font-bold grid place-items-center border-black border-1 border box-border border-dashed " +
        (value == 2
          ? " bg-red-500/30 after:absolute after:w-[240px] after:aspect-square after:bg-red-500/[.15] "
          : "")
      }
    >
      {showVisuals ? (
        value === 0 ? (
          <></>
        ) : (
          <>
            <IoPerson
              className={
                "text-[32px] " +
                (value == 1 ? "text-green-600" : "text-red-800")
              }
            />
          </>
        )
      ) : (
        <h1>{value}</h1>
      )}
      {/* {index} */}
    </div>
  );
}

export default function Home() {
  // * Setup Grid
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(15);
  const [grid, setGrid] = useState([]);
  const [colsClass, setColsClass] = useState("grid-cols-5");

  // * Other Parameters
  // ? Rasio orang dengan total grid / Kepadatan populasi di area - Dimodelkan dengan probabilitas adanya orang dalam tiap grid
  const [populationDensity, setPopulationDensity] = useState(0.5);
  // ? Rasio orang yang terinfeksi dengan total orang - Dimodelkan dengan probabilitas 1 orang membawa penyakit
  const [infectionRate, setInfectionRate] = useState(0.1);
  // ? Ukuran seberapa menular penyakit - Dimodelkan dengan jarak neighborhood yang dapat tertular
  const [spreadRange, setSpreadRange] = useState(1);
  // ? Imunitas seseorang - Dimodelkan dengan probabilitas orang dalam jarak tertular, bisa tidak tertular
  const [immunityRate, setImmunityRate] = useState(0.4);
  // ? Iterasi waktu
  const [iteration, setIteration] = useState(0);

  // * Variables for Visual Needs
  const [showVisuals, setShowVisuals] = useState(true);

  // * Utility Variables
  const [refresh, setRefresh] = useState(false);

  // * Populate Grid
  useEffect(() => {
    const newGrid = [];
    for (let i = 0; i < rows * cols; i++) {
      const randomNumber = Math.random();
      // console.log(randomNumber);
      let value = 0;
      if (randomNumber < populationDensity) {
        const randomNumber2 = Math.random();
        if (randomNumber2 < infectionRate) {
          value = 2;
        } else {
          value = 1;
        }
      }
      newGrid.push({
        value,
      });
    }
    setGrid(newGrid);
  }, [rows, cols, refresh]);

  // * Spread Disease
  useEffect(() => {
    if (grid.length > 0) {
      const newGrid = [...grid];
      for (let i = 0; i < rows * cols; i++) {
        if (newGrid[i].value == 2) {
          // * Spread Disease to the left of the sick person
          if (
            grid[i - 1] &&
            grid[i - 1].value == 1 &&
            i % cols != 0 //? Check if the person is not at the leftmost of the grid
          ) {
            newGrid[i - 1].value = 2;
          }
          // * Spread Disease to the right of the sick person
          if (
            grid[i + 1] &&
            grid[i + 1].value == 1 &&
            i % cols != cols - 1 //? Check if the person is not at the rightmost of the grid
          ) {
            newGrid[i + 1].value = 2;
          }
          // * Spread Disease to the top of the sick person
          if (grid[i - cols] && grid[i - cols].value == 1) {
            newGrid[i - cols].value = 2;
          }
          // * Spread Disease to the bottom of the sick person
          if (grid[i + cols] && grid[i + cols].value == 1) {
            newGrid[i + cols].value = 2;
          }
          // * Spread Disease to the top left of the sick person
          if (
            grid[i - cols - 1] &&
            grid[i - cols - 1].value == 1 &&
            i % cols != 0 //? Check if the person is not at the leftmost of the grid
          ) {
            newGrid[i - cols - 1].value = 2;
          }
          // * Spread Disease to the top right of the sick person
          if (
            grid[i - cols + 1] &&
            grid[i - cols + 1].value == 1 &&
            i % cols != cols - 1 //? Check if the person is not at the rightmost of the grid
          ) {
            newGrid[i - cols + 1].value = 2;
          }
          // * Spread Disease to the bottom left of the sick person
          if (
            grid[i + cols - 1] &&
            grid[i + cols - 1].value == 1 &&
            i % cols != 0 //? Check if the person is not at the leftmost of the grid
          ) {
            newGrid[i + cols - 1].value = 2;
          }
          // * Spread Disease to the bottom right of the sick person
          if (
            grid[i + cols + 1] &&
            grid[i + cols + 1].value == 1 &&
            i % cols != cols - 1 //? Check if the person is not at the rightmost of the grid
          ) {
            newGrid[i + cols + 1].value = 2;
          }
        }
      }
      setGrid(newGrid);
    }
  }, [iteration]);

  return (
    <main className="bg-white min-h-screen relative flex flex-col justify-center items-center py-10">
      <h1 className="text-center text-black text-3xl font-bold">
        Disease Spread Simulation
      </h1>
      <h2 className="text-center text-black text-2xl font-bold">
        Iteration {iteration}
      </h2>
      <div className="flex flex-col justify-center items-center gap-10 mt-5">
        <div
          className="simulation-grid w-fit outline outline-1 outline-black !overflow-hidden"
          style={{ "--grid-cols": cols }}
        >
          {grid.map((grid_item, i) => (
            <GridBox
              key={i}
              value={grid_item.value}
              index={i}
              showVisuals={showVisuals}
              grid={grid}
              cols={cols}
            />
          ))}
        </div>
        <div className="flex gap-5">
          <div
            className="bg-black text-white cursor-pointer p-3 unselectable"
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            Regenerate
          </div>
          <div
            className="bg-black text-white cursor-pointer p-3 unselectable"
            onClick={() => {
              setIteration(iteration + 1);
            }}
          >
            Next Iteration
          </div>
        </div>
      </div>
    </main>
  );
}
