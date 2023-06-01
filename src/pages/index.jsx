import Image from "next/image";
import { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { BsFillGearFill } from "react-icons/bs";

function GridBox({ value, showVisuals, index, grid, cols }) {
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
      {/* {index} */}
    </div>
  );
}

function Settings({ saveSettings }) {
  return (
    <div className="fixed w-screen h-screen bg-black/50 grid place-items-center">
      <div className="bg-white py-5 px-10 w-[50%] rounded-[5px]">
        <h1 className="text-center font-bold">Settings</h1>
        <form
          onSubmit={(e) => saveSettings(e)}
          className="my-3 flex flex-col gap-2"
        >
          <div className="flex flex-col">
            <label htmlFor="populationDensity">Population Density</label>
            <input
              className="!outline-none"
              type="number"
              name="populationDensity"
              id="populationDensity"
            />
            <hr />
          </div>
          <div className="flex flex-col">
            <label htmlFor="infectionRate">Infection Rate</label>
            <input
              className="!outline-none"
              type="number"
              name="infectionRate"
              id="infectionRate"
            />
            <hr />
          </div>
          <div className="flex flex-col">
            <label htmlFor="spreadRange">Spread Range</label>
            <input
              className="!outline-none"
              type="number"
              name="spreadRange"
              id="spreadRange"
            />
            <hr />
          </div>
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
  const [cols, setCols] = useState(5);
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
  }, [refresh]);

  // * Spread Disease
  useEffect(() => {
    if (grid.length > 0) {
      console.log(`Iteration ${iteration}`);
      const newGrid = [...grid]; // Create a new copy of the grid
      const infectedCells = []; // Store the indices of infected cells

      for (let i = 0; i < rows * cols; i++) {
        if (newGrid[i].value === 2) {
          // Store the infected cell index
          infectedCells.push(i);
        }
      }

      // Iterate through infected cells and spread the disease
      for (const infectedIndex of infectedCells) {
        const row = Math.floor(infectedIndex / cols);
        const col = infectedIndex % cols;

        // * Spread Disease to the left of the sick person
        if (col > 0 && newGrid[infectedIndex - 1].value === 1) {
          newGrid[infectedIndex - 1].value = 2;
        }
        // * Spread Disease to the right of the sick person
        if (col < cols - 1 && newGrid[infectedIndex + 1].value === 1) {
          newGrid[infectedIndex + 1].value = 2;
        }
        // * Spread Disease to the top of the sick person
        if (row > 0 && newGrid[infectedIndex - cols].value === 1) {
          newGrid[infectedIndex - cols].value = 2;
        }
        // * Spread Disease to the bottom of the sick person
        if (row < rows - 1 && newGrid[infectedIndex + cols].value === 1) {
          newGrid[infectedIndex + cols].value = 2;
        }
        // * Spread Disease to the top left of the sick person
        if (
          row > 0 &&
          col > 0 &&
          newGrid[infectedIndex - cols - 1].value === 1
        ) {
          newGrid[infectedIndex - cols - 1].value = 2;
        }
        // * Spread Disease to the top right of the sick person
        if (
          row > 0 &&
          col < cols - 1 &&
          newGrid[infectedIndex - cols + 1].value === 1
        ) {
          newGrid[infectedIndex - cols + 1].value = 2;
        }
        // * Spread Disease to the bottom left of the sick person
        if (
          row < rows - 1 &&
          col > 0 &&
          newGrid[infectedIndex + cols - 1].value === 1
        ) {
          newGrid[infectedIndex + cols - 1].value = 2;
        }
        // * Spread Disease to the bottom right of the sick person
        if (
          row < rows - 1 &&
          col < cols - 1 &&
          newGrid[infectedIndex + cols + 1].value === 1
        ) {
          newGrid[infectedIndex + cols + 1].value = 2;
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
              iteration == null ? setIteration(0) : setIteration(iteration + 1);
            }}
          >
            Next Iteration
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 left-0 p-5 bg-slate-400 rounded-br-[10px] cursor-pointer hover:bg-slate-400/90"
        onClick={() => setShowSettings(true)}
      >
        <BsFillGearFill className="text-[30px]" />
      </div>
      {showSettings && <Settings saveSettings={saveSettings} />}
    </main>
  );
}
