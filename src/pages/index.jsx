import Image from "next/image";
import { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { BsFillGearFill } from "react-icons/bs";

function GridBox({ value, showVisuals, i, j }) {
  return (
    <div
      className={
        "w-[80px] transition-colors duration-200 aspect-square relative font-bold grid place-items-center border-black border-1 border box-border border-dashed " +
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
      {/* {i + "," + j} */}
    </div>
  );
}

function Settings({
  saveSettings,
  populationDensity,
  infectionRate,
  rows,
  cols,
  setPopulationDensity,
  setInfectionRate,
  setRows,
  setCols,
  setSpreadRange,
}) {
  return (
    <div className="fixed w-screen h-screen bg-black/50 grid place-items-center top-0">
      <div className="bg-white py-5 px-10 w-[50%] rounded-[5px]">
        <h1 className="text-center font-bold text-2xl mb-5">Settings</h1>
        <form
          onSubmit={(e) => saveSettings(e)}
          className="my-3 flex flex-col gap-4"
        >
          <div className="flex flex-row gap-4">
            <div className="w-full">
              <label className="w-full block " htmlFor="rows">
                Grid Size (n times n)
              </label>
              <input
                className="!outline-none w-full"
                type="number"
                name="rows"
                id="rows"
                max={20}
                min={1}
                value={rows}
                onChange={(e) => {setRows(e.target.value); setCols(e.target.value)}}
              />
              <hr className="h-[2px] bg-black/20" />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="populationDensity">Population Density</label>
            <input
              className="!outline-none"
              type="number"
              name="populationDensity"
              id="populationDensity"
              min={0}
              max={1}
              step={0.01}
              value={populationDensity}
              onChange={(e) => setPopulationDensity(e.target.value)}
            />
            <hr className="h-[2px] bg-black/20" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="infectionRate">Infection Rate</label>
            <input
              className="!outline-none"
              type="number"
              name="infectionRate"
              id="infectionRate"
              min={0}
              max={1}
              step={0.01}
              value={infectionRate}
              onChange={(e) => setInfectionRate(e.target.value)}
            />
            <hr className="h-[2px] bg-black/20" />
          </div>
          {/* <div className="flex flex-col">
            <label htmlFor="spreadRange">Spread Range</label>
            <input
              className="!outline-none"
              type="number"
              name="spreadRange"
              id="spreadRange"
              min={0}
              max={1}
              step={0.01}
              value={}
            />
            <hr className="h-[2px] bg-black/20" />
          </div> */}
          <button
            type="submit"
            className="bg-black text-white rounded-md py-2 mt-5 hover:bg-black/90"
          >
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  // * Setup Grid
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(rows);
  const [grid, setGrid] = useState([]);
  const [colsClass, setColsClass] = useState("grid-cols-5");

  // * Other Parameters
  // ? Rasio orang dengan total grid / Kepadatan populasi di area - Dimodelkan dengan probabilitas adanya orang dalam tiap grid
  const [populationDensity, setPopulationDensity] = useState(0.5);
  // ? Rasio orang yang terinfeksi dengan total orang - Dimodelkan dengan probabilitas 1 orang membawa penyakit
  const [infectionRate, setInfectionRate] = useState(1 / 100);
  // ? Ukuran seberapa menular penyakit - Dimodelkan dengan jarak neighborhood yang dapat tertular
  const [spreadRange, setSpreadRange] = useState(1);
  // ? Imunitas seseorang - Dimodelkan dengan probabilitas orang dalam jarak tertular, bisa tidak tertular
  const [immunityRate, setImmunityRate] = useState(0.4);
  // ? Iterasi waktu
  const [iteration, setIteration] = useState(0);

  // * Variables for Visual Needs
  const [showVisuals, setShowVisuals] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // * Utility Variables
  const [refresh, setRefresh] = useState(false);

  // * Populate Grid
  useEffect(() => {
    setIteration(0);
    const newGrid = [];
    for (let i = 0; i < cols; i++) {
      const row = [];
      for (let j = 0; j < rows; j++) {
        const randomNumber = Math.random();
        let value = 0;
        if (randomNumber < populationDensity) {
          if (randomNumber < infectionRate) {
            value = 2;
          } else {
            value = 1;
          }
        }

        row.push({
          value,
        });
      }
      newGrid.push(row);
    }
    console.log(newGrid);
    setGrid(newGrid);
  }, [refresh]);

  // * Spread Disease
  useEffect(() => {
    const newGrid = JSON.parse(JSON.stringify(grid)); // * Create a new copy of the grid
    const infectedCells = [];
    if (grid.length > 0) {
      console.log(`Iteration ${iteration}`);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (grid[i][j]) {
            if (grid[i][j]?.value === 2) {
              infectedCells.push({ row: i, col: j }); // * Store the infected cell coordinates
            }
          }
        }
      }
      // * Iterate through infected cells and spread the disease
      for (const infectedCell of infectedCells) {
        const { row, col } = infectedCell;
        if (row < rows && col < cols) {
          // * Spread Disease to the left of the sick person
          if (col > 0 && newGrid[row][col - 1]?.value === 1) {
            newGrid[row][col - 1].value = 2;
          }
          // * Spread Disease to the right of the sick person
          if (col < cols - 1 && newGrid[row][col + 1]?.value === 1) {
            newGrid[row][col + 1].value = 2;
          }
          // * Spread Disease to the top of the sick person
          if (row > 0 && newGrid[row - 1][col]?.value === 1) {
            newGrid[row - 1][col].value = 2;
          }
          // * Spread Disease to the bottom of the sick person
          if (row < rows - 1 && newGrid[row + 1][col]?.value === 1) {
            newGrid[row + 1][col].value = 2;
          }
          // * Spread Disease to the top left of the sick person
          if (row > 0 && col > 0 && newGrid[row - 1][col - 1]?.value === 1) {
            newGrid[row - 1][col - 1].value = 2;
          }
          // * Spread Disease to the top right of the sick person
          if (
            row > 0 &&
            col < cols - 1 &&
            newGrid[row - 1][col + 1]?.value === 1
          ) {
            newGrid[row - 1][col + 1].value = 2;
          }
          // * Spread Disease to the bottom left of the sick person
          if (
            row < rows - 1 &&
            col > 0 &&
            newGrid[row + 1][col - 1]?.value === 1
          ) {
            newGrid[row + 1][col - 1].value = 2;
          }
          // * Spread Disease to the bottom right of the sick person
          if (
            row < rows - 1 &&
            col < cols - 1 &&
            newGrid[row + 1][col + 1]?.value === 1
          ) {
            newGrid[row + 1][col + 1].value = 2;
          }
        }
      }
      setGrid(newGrid);
    }
  }, [iteration]);

  // * Save Settings
  const saveSettings = (e) => {
    e.preventDefault();
    setRefresh(!refresh);
    setShowSettings(false);
  };

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
          style={{ "--grid-cols": rows }}
        >
          {grid.map((row, i) => {
            return row.map((col, j) => {
              return (
                <GridBox
                  key={`${i}${j}`}
                  value={col.value}
                  i={i}
                  j={j}
                  showVisuals={showVisuals}
                  grid={grid}
                  cols={cols}
                />
              );
            });
          })}
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
              iteration == null ? setIteration(0) : setIteration(iteration + 1);
            }}
          >
            Next Iteration
          </div>
        </div>
      </div>
      {/* Setting Button */}
      <div
        className="absolute top-0 left-0 p-5 bg-slate-400 rounded-br-[10px] cursor-pointer hover:bg-slate-400/90"
        onClick={() => setShowSettings(true)}
      >
        <BsFillGearFill className="text-[30px]" />
      </div>
      {/* Settings Menu */}
      {showSettings && (
        <Settings
          populationDensity={populationDensity}
          infectionRate={infectionRate}
          rows={rows}
          setPopulationDensity={setPopulationDensity}
          setInfectionRate={setInfectionRate}
          setRows={setRows}
          setCols={setCols}
          saveSettings={saveSettings}
        />
      )}
    </main>
  );
}
