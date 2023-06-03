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
                (durability == 1 ? " text-blue-700" : "")
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
  infectionRate,
  rows,
  setPopulationDensity,
  setInfectionRate,
  setRows,
  setCols,
}) {
  return (
    <div className="fixed w-screen h-screen bg-black/50 grid place-items-center top-0 z-[20]">
      <div className="bg-white py-5 px-10 w-[50%] rounded-[5px]">
        <h1 className="text-center font-bold text-[1.4vw] mb-5">Settings</h1>
        <form
          onSubmit={(e) => saveSettings(e)}
          className="my-3 flex flex-col gap-4 text-[1.2vw]"
        >
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

function LineChart({ infectedArray }) {
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
    <div className="w-full lg:w-[50%] flex justify-start fixed left-0 bottom-0">
      <Line data={data} options={options} />
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
  // ? Rasio orang dengan total grid / Kepadatan populasi di area - Dimodelkan dengan probabilitas adanya orang dalam tiap cell
  const [populationDensity, setPopulationDensity] = useState(0.5);
  // ? Rasio orang yang terinfeksi dengan total orang - Dimodelkan dengan probabilitas pembawa penyakit pada awal simulasi
  const [infectedRate, setInfectedRate] = useState(0.01);
  // ? Ukuran seberapa menular penyakit - Dimodelkan dengan probability menularkan ke orang sekitar
  const [infectionProbability, setInfectionProbability] = useState(0.55);
  // ? Nilai maximum & minimum durability - Memodelkan tingkat kesehatan di wilayah yang disimulasikan
  const [maxDurability, setMaxDurability] = useState(0.6);
  const [minDurability, setMinDurability] = useState(0.5);
  // ? Iterasi waktu
  const [iteration, setIteration] = useState(0);

  // * Variables for Visual Needs
  const [showVisuals, setShowVisuals] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showLiveChart, setShowLiveChart] = useState(false);
  // ? Variables for simulation results
  const [infectedArray, setInfectedArray] = useState([0]);

  // * Utility Variables
  const [refresh, setRefresh] = useState(false);

  // * Populate Grid
  useEffect(() => {
    setIteration(0);
    setInfectedArray([0]);
    const newGrid = [];
    for (let i = 0; i < cols; i++) {
      const row = [];
      for (let j = 0; j < rows; j++) {
        const randomNumber = Math.random();
        let value = 0;
        let durability = 0;
        if (randomNumber < populationDensity) {
          const randomNumber2 = Math.random();
          const randomNumber3 =
            Math.random() * (maxDurability - minDurability) + minDurability;
          durability = randomNumber3;
          if (randomNumber2 < infectedRate) {
            value = 2;
          } else {
            value = 1;
          }
        }

        row.push({
          value,
          durability,
        });
      }
      newGrid.push(row);
    }
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
      if (infectedCells.length == 0 && iteration > 0) {
        alert("No more infected people left! Simulation has ended.");
        return;
      }
      for (const infectedCell of infectedCells) {
        const { row, col } = infectedCell;
        if (row < rows && col < cols) {
          // * Spread Disease to the left of the sick person
          if (col > 0 && newGrid[row][col - 1]?.value === 1) {
            if (
              Math.random() <
              infectionProbability * (1 - newGrid[row][col].durability)
            ) {
              newGrid[row][col - 1].value = 2;
            }
          }
          // * Spread Disease to the right of the sick person
          if (col < cols - 1 && newGrid[row][col + 1]?.value === 1) {
            if (
              Math.random() <
              infectionProbability * (1 - newGrid[row][col].durability)
            ) {
              newGrid[row][col + 1].value = 2;
            }
          }
          // * Spread Disease to the top of the sick person
          if (row > 0 && newGrid[row - 1][col]?.value === 1) {
            if (
              Math.random() <
              infectionProbability * (1 - newGrid[row][col].durability)
            ) {
              newGrid[row - 1][col].value = 2;
            }
          }
          // * Spread Disease to the bottom of the sick person
          if (row < rows - 1 && newGrid[row + 1][col]?.value === 1) {
            if (
              Math.random() <
              infectionProbability * (1 - newGrid[row][col].durability)
            ) {
              newGrid[row + 1][col].value = 2;
            }
          }
          // * Spread Disease to the top left of the sick person
          if (row > 0 && col > 0 && newGrid[row - 1][col - 1]?.value === 1) {
            if (
              Math.random() <
              infectionProbability * (1 - newGrid[row][col].durability)
            ) {
              newGrid[row - 1][col - 1].value = 2;
            }
          }
          // * Spread Disease to the top right of the sick person
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
          // * Spread Disease to the bottom left of the sick person
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
          // * Spread Disease to the bottom right of the sick person
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
          // ? Recover from Disease
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
      const amountOfInfected = newGrid
        .flat()
        .filter((cell) => cell.value === 2).length;
      setInfectedArray((prev) => [...prev, amountOfInfected]);
      console.log(infectedArray);
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
      <h1 className="text-center text-black text-[1.4vw] font-bold">
        Disease Spread Simulation
      </h1>
      <div className="flex flex-col justify-center items-center gap-10 mt-5 relative z-[5]">
        <div
          className="simulation-grid w-fit outline outline-1 outline-black !overflow-hidden"
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
        <h2 className="text-center text-black text-[1.2vw] font-bold">
          Iteration {iteration}
        </h2>
        {/* Control Buttons */}
        <div className="flex gap-5 relative z-[5]">
          <div
            className="bg-black text-white cursor-pointer p-3 unselectable hover:bg-black/90 text-[1.2vw]"
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            Regenerate
          </div>
          <div
            className="bg-black text-white cursor-pointer p-3 unselectable hover:bg-black/90 text-[1.2vw]"
            onClick={() => {
              iteration == null ? setIteration(0) : setIteration(iteration + 1);
            }}
          >
            Next Iteration
          </div>
          <div
            className="bg-black text-white cursor-pointer p-3 unselectable hover:bg-black/90 text-[1.2vw]"
            onClick={() => {
              iteration == null ? setIteration(0) : setIteration(iteration + 1);
            }}
          >
            Auto Play
          </div>
          <div
            className="bg-black text-white cursor-pointer p-3 unselectable hover:bg-black/90 text-[1.2vw]"
            onClick={() => {
              setShowLiveChart(!showLiveChart);
            }}
          >
            Toggle Live Chart
          </div>
        </div>
      </div>
      {showLiveChart && <LineChart infectedArray={infectedArray} />}
      {/* Setting Button */}
      <div
        className="fixed top-0 left-0 p-5 bg-slate-400 rounded-br-[10px] cursor-pointer hover:bg-slate-400/90"
        onClick={() => setShowSettings(true)}
      >
        <BsFillGearFill className="text-[30px]" />
      </div>
      {/* Settings Menu */}
      {showSettings && (
        <Settings
          populationDensity={populationDensity}
          infectionRate={infectedRate}
          rows={rows}
          setPopulationDensity={setPopulationDensity}
          setInfectionRate={setInfectedRate}
          setRows={setRows}
          setCols={setCols}
          saveSettings={saveSettings}
        />
      )}
    </main>
  );
}
