import Image from "next/image";
import { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { BsFillGearFill } from "react-icons/bs";
import { Chart as ChartJS } from "chart.js";
import { registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

function Cell({ value, showVisuals, i, j, durability }) {
  return (
    <div
      className={
        "w-[80px] transition-colors duration-200 aspect-square relative font-bold grid place-items-center border-black border-1 border box-border border-dashed " +
        (value == 2
          ? " bg-red-500/30 after:absolute after:w-[240px] after:aspect-square after:bg-red-500/[.15] "
          : "") +
        (value == 3
          ? " bg-blue-500/30 after:absolute after:w-[80px] after:aspect-square after:bg-red-500/[.15] "
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
                "text-[32px] relative z-[2] " +
                (value == 1 ? "text-green-600" : "text-red-700") +
                (durability == 1 ? " !text-blue-700" : "")
              }
            />
            {Number(durability).toFixed(2) || ""}
          </>
        )
      ) : (
        <></>
      )}
      {/* {i + "," + j} */}
    </div>
  );
}

function Settings({
  saveSettings,
  populationDensity,
  setPopulationDensity,
  infectionRate,
  setInfectionRate,
  infectionProbability,
  setInfectionProbability,
  minDurability,
  setMinDurability,
  maxDurability,
  setMaxDurability,
  rows,
  setRows,
  setCols,
}) {
  return (
    <div className="fixed w-screen h-screen bg-black/50 grid place-items-center top-0 z-[20]">
      <div className="bg-white py-5 px-10 w-[50%] rounded-[5px]">
        <h1 className="text-center font-bold text-[2vw] mb-5">Settings</h1>
        <form
          onSubmit={(e) => saveSettings(e)}
          className="my-3 flex flex-col gap-4 text-[1.5vw]"
        >
          <h1 className="text-[1.5vw] font-semibold text-center">Initial Generation</h1>
          <div className="flex flex-row gap-4">
            <div className="w-full">
              <label className="w-full block " htmlFor="rows">
                Grid Size (n x n)
              </label>
              <input
                className="!outline-none w-full"
                type="number"
                name="rows"
                id="rows"
                max={20}
                min={1}
                value={rows}
                onChange={(e) => {
                  setRows(e.target.value);
                  setCols(e.target.value);
                }}
              />
              <hr className="h-[2px] bg-black/20" />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="populationDensity">Population Density</label>
            <input
              className="!outline-none"
              type="text"
              name="populationDensity"
              id="populationDensity"
              value={populationDensity}
              onChange={(e) => {
                if (
                  e.target.value > 1 ||
                  e.target.value < 0 ||
                  isNaN(e.target.value)
                )
                  return;
                setPopulationDensity(e.target.value);
              }}
            />
            <hr className="h-[2px] bg-black/20" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="infectionRate">Infected Rate</label>
            <input
              className="!outline-none"
              type="text"
              name="infectionRate"
              id="infectionRate"
              value={infectionRate}
              onChange={(e) => {
                if (
                  e.target.value > 1 ||
                  e.target.value < 0 ||
                  isNaN(e.target.value)
                )
                  return;
                setInfectionRate(e.target.value);
              }}
            />
            <hr className="h-[2px] bg-black/20" />
          </div>
          <h1 className="text-[1.5vw] font-semibold text-center">Simulation</h1>
          <div className="flex flex-col">
            <label htmlFor="infectionRate">Infection Probability</label>
            <input
              className="!outline-none"
              type="text"
              name="infectionRate"
              id="infectionRate"
              value={infectionProbability}
              onChange={(e) => {
                if (
                  e.target.value > 1 ||
                  e.target.value < 0 ||
                  isNaN(e.target.value)
                )
                  return;
                setInfectionProbability(e.target.value);
              }}
            />
            <hr className="h-[2px] bg-black/20" />
          </div>
          {/* // ! FIX: NaN BUG */}
          {/* <div className="flex flex-col">
            <label htmlFor="infectionRate">Min Durability</label>
            <input
              className="!outline-none"
              type="text"
              name="infectionRate"
              id="infectionRate"
              value={minDurability}
              onChange={(e) => {
                if (
                  e.target.value > 1 ||
                  e.target.value < 0 ||
                  isNaN(e.target.value)
                )
                  return;
                setMinDurability(e.target.value);
              }}
            />
            <hr className="h-[2px] bg-black/20" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="infectionRate">Max Durability</label>
            <input
              className="!outline-none"
              type="text"
              name="infectionRate"
              id="infectionRate"
              value={maxDurability}
              onChange={(e) => {
                if (
                  e.target.value > 1 ||
                  e.target.value < 0
                )
                  return;
                setMaxDurability(e.target.value);
              }}
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

function LineChart({ infectedArray, className }) {
  const data = {
    labels: infectedArray.map((_, i) => i),
    datasets: [
      {
        label: "# of Infected",
        data: infectedArray,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.1,
        cubicInterpolationMode: "monotone",
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.4)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className={className}>
      <Line data={data} options={options} />
    </div>
  );
}

function Result({ infectedArray, iteration, setShowResult }) {
  return (
    <div className="fixed w-screen h-screen bg-black/50 grid place-items-center top-0 z-[20] unselectable">
      <div className="bg-white py-12 px-20 w-[60%] rounded-[5px]">
        <h1 className="text-center font-bold text-[2vw] mb-5">Result</h1>
        <h2 className="text-center font-semibold text-[1.5vw] mt-5">
          Total Iteration
        </h2>
        <h2 className="text-center font-bold text-[1.8vw]">{iteration}</h2>
        <h2 className="text-center font-semibold text-[1.5vw] mt-5">
          Infected Amount - Iteration
        </h2>
        <LineChart infectedArray={infectedArray} className="w-full mx-auto" />
        <div
          className="bg-black cursor-pointer text-white rounded-md mt-5 text-[1.5vw] hover:bg-black/90 w-fit mx-auto py-3 px-5"
          onClick={() => {
            setShowResult(false);
          }}
        >
          CLOSE
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  // * Main Variables
  // ? Grid Setup
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(rows);
  const [grid, setGrid] = useState([]);
  // ? Population Density - Probability of a cell being occupied
  const [populationDensity, setPopulationDensity] = useState(0.5);
  // ? Infected Rate - Probability of a cell being generated as infected (initial carrier)
  const [infectedRate, setInfectedRate] = useState(0.01);
  // ? Infection Probability - Probability of an infection happening to a cell within an infection zone
  const [infectionProbability, setInfectionProbability] = useState(0.5);
  // ? Health factors - Durability of a cell to resist infection or recover from infection
  const [maxDurability, setMaxDurability] = useState(0.6);
  const [minDurability, setMinDurability] = useState(0.5);
  // ? Iteration
  const [iteration, setIteration] = useState(0);

  // * Variables for Visual Needs
  const [showVisuals, setShowVisuals] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showLiveChart, setShowLiveChart] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [infectedArray, setInfectedArray] = useState([0]);

  // * Utility Variables
  const [refresh, setRefresh] = useState(false);

  // * Populate Grid
  useEffect(() => {
    setIteration(0);    //? Reset Iteration
    setInfectedArray([0]); // ? Reset Infected Array
    const newGrid = [];   // ? Make a copy of the grid
    // ? Iterate through the grid and populate it with cells
    for (let i = 0; i < cols; i++) {
      const row = [];
      for (let j = 0; j < rows; j++) {
        const randomNumber = Math.random();
        let value = 0;
        let durability = 0;
        if (randomNumber < populationDensity) {
          const randomNumber2 = Math.random();    // ? Random number to determine state
          const randomNumber3 =   // ? Random number to determine durability
            Math.random() * (maxDurability - minDurability) + minDurability;
          durability = randomNumber3;
          if (randomNumber2 < infectedRate) {
            value = 2;
          } else {
            value = 1;
          }
        }
        // ? Push the cell into the row with its value and durability
        row.push({
          value,
          durability,
        });
      }
      newGrid.push(row);    // ? Push the row into the grid
    }
    setGrid(newGrid);   // ? Set the grid to the new grid to update the UI
  }, [refresh]);    // ? Re-populate the grid when the refresh variable changes

  // ? Spread Disease
  useEffect(() => {
    const newGrid = JSON.parse(JSON.stringify(grid));   // ? Make a copy of the grid
    const infectedCells = [];   // ? Array to store the infected cells
    if (grid.length > 0) {    // ? Prevent reading undefined grid
      console.log(`Iteration ${iteration}`);
      for (let i = 0; i < cols; i++) {    // ? Iterate through the columns
        for (let j = 0; j < rows; j++) {    // ? Iterate through the rows
          if (grid[i][j]) {   // ? Prevent reading undefined cell
            if (grid[i][j]?.value === 2) {    
              infectedCells.push({ row: i, col: j }); // ? Store the infected cell coordinates
            }
          }
        }
      }
      // ? If there are no infected cells, end the simulation
      if (infectedCells.length == 0 && iteration > 0) {
        setShowResult(true);
        return;
      }
      // ? Iterate through infected cells and spread the disease
      for (const infectedCell of infectedCells) {
        const { row, col } = infectedCell;
        if (row < rows && col < cols) {
          // ? Spread Disease to the left of the sick person
          if (col > 0 && newGrid[row][col - 1]?.value === 1) {
            if (
              Math.random() <
              infectionProbability * (1 - newGrid[row][col].durability)
            ) {
              newGrid[row][col - 1].value = 2;
            }
          }
          // ? Spread Disease to the right of the sick person
          if (col < cols - 1 && newGrid[row][col + 1]?.value === 1) {
            if (
              Math.random() <
              infectionProbability * (1 - newGrid[row][col].durability)
            ) {
              newGrid[row][col + 1].value = 2;
            }
          }
          // ? Spread Disease to the top of the sick person
          if (row > 0 && newGrid[row - 1][col]?.value === 1) {
            if (
              Math.random() <
              infectionProbability * (1 - newGrid[row][col].durability)
            ) {
              newGrid[row - 1][col].value = 2;
            }
          }
          // ? Spread Disease to the bottom of the sick person
          if (row < rows - 1 && newGrid[row + 1][col]?.value === 1) {
            if (
              Math.random() <
              infectionProbability * (1 - newGrid[row][col].durability)
            ) {
              newGrid[row + 1][col].value = 2;
            }
          }
          // ? Spread Disease to the top left of the sick person
          if (row > 0 && col > 0 && newGrid[row - 1][col - 1]?.value === 1) {
            if (
              Math.random() <
              infectionProbability * (1 - newGrid[row][col].durability)
            ) {
              newGrid[row - 1][col - 1].value = 2;
            }
          }
          // ? Spread Disease to the top right of the sick person
          if (
            row > 0 &&
            col < cols - 1 &&
            newGrid[row - 1][col + 1]?.value === 1
          ) {
            if (
              Math.random() <
              infectionProbability * (1 - newGrid[row][col].durability)
            ) {
              newGrid[row - 1][col + 1].value = 2;
            }
          }
          // ? Spread Disease to the bottom left of the sick person
          if (
            row < rows - 1 &&
            col > 0 &&
            newGrid[row + 1][col - 1]?.value === 1
          ) {
            if (
              Math.random() <
              infectionProbability * (1 - newGrid[row][col].durability)
            ) {
              newGrid[row + 1][col - 1].value = 2;
            }
          }
          // ? Spread Disease to the bottom right of the sick person
          if (
            row < rows - 1 &&
            col < cols - 1 &&
            newGrid[row + 1][col + 1]?.value === 1
          ) {
            if (
              Math.random() <
              infectionProbability * (1 - newGrid[row][col].durability)
            ) {
              newGrid[row + 1][col + 1].value = 2;
            }
          }
          // ? A chance to recover every 3 iterations
          const randomNumber = Math.random();
          if (
            randomNumber < newGrid[row][col].durability &&
            iteration % 3 == 0
          ) {
            newGrid[row][col].value = 3;
            newGrid[row][col].durability = 1;
          }
        }
      }
      // ? Count the amount of infected people to display in a line chart
      const amountOfInfected = newGrid
        .flat()
        .filter((cell) => cell.value === 2).length;
      setInfectedArray((prev) => [...prev, amountOfInfected]);    // ? Add the amount of infected people to the array
      console.log(infectedArray);
      setGrid(newGrid);  // ? Update the grid
    }
  }, [iteration]);  // ? Run every time the iteration changes

  // * Save Settings
  const saveSettings = (e) => {
    e.preventDefault();
    setRefresh(!refresh);
    setShowSettings(false);
  };

  return (
    <main className="bg-white min-h-screen relative flex flex-col justify-center items-center py-10">
      <h1 className="text-center text-black text-[2vw] font-bold">
        Pandemic Simulation
      </h1>
      <div className="flex flex-col justify-center items-center gap-10 mt-5 relative z-[5]">
        {/* Grid */}
        <div
          className="simulation-grid w-fit outline outline-1 outline-black !overflow-hidden bg-white/50"
          style={{ "--grid-cols": rows }}
        >
          {grid.map((row, i) => {
            return row.map((col, j) => {
              return (
                <Cell
                  key={`${i}${j}`}
                  value={col.value}
                  durability={col.durability}
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
        <h2 className="text-center text-black text-[1.8vw] font-bold">
          Iteration {iteration}
        </h2>
        {/* Control Buttons */}
        <div className="flex gap-5 relative z-[5] mt-[-20px]">
          <div
            className="bg-black text-white cursor-pointer p-3 unselectable hover:bg-black/90 text-[1.5vw] px-4 rounded-md"
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            Regenerate
          </div>
          <div
            className="bg-black text-white cursor-pointer p-3 unselectable hover:bg-black/90 text-[1.5vw] px-4 rounded-md"
            onClick={() => {
              iteration == null ? setIteration(0) : setIteration(iteration + 1);
            }}
          >
            Next Iteration
          </div>
          <div
            className="bg-black text-white cursor-pointer p-3 unselectable hover:bg-black/90 text-[1.5vw] px-4 rounded-md"
            onClick={() => {
              setShowLiveChart(!showLiveChart);
            }}
          >
            Toggle Live Chart
          </div>
        </div>
      </div>
      {showLiveChart && (
        <LineChart
          infectedArray={infectedArray}
          className="w-full flex justify-start fixed left-0 bottom-0"
        />
      )}
      {/* Setting Button */}
      <div
        className="fixed top-0 left-0 p-5 bg-slate-400 rounded-br-[10px] cursor-pointer hover:bg-slate-400/90"
        onClick={() => setShowSettings(true)}
      >
        <BsFillGearFill className="text-[2vw]" />
      </div>
      {/* Settings Menu */}
      {showSettings && (
        <Settings
        rows={rows}
          populationDensity={populationDensity}
          setPopulationDensity={setPopulationDensity}
          infectionRate={infectedRate}
          setInfectionRate={setInfectedRate}
          infectionProbability={infectionProbability}
          setInfectionProbability={setInfectionProbability}
          minDurability={minDurability}
          setMinDurability={setMinDurability}
          maxDurability={maxDurability}
          setMaxDurability={setMaxDurability}
          setRows={setRows}
          setCols={setCols}
          saveSettings={saveSettings}
          
        />
      )}
      {/* Results */}
      {showResult && (
        <Result
          infectedArray={infectedArray}
          iteration={iteration}
          setShowResult={setShowResult}
        />
      )}
    </main>
  );
}
