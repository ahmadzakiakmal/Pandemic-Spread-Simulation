import Image from "next/image";
import { useEffect, useState } from "react";

function GridBox({value, showVisuals}) {
  return (
    <div className="w-[80px] !aspect-square font-bold grid place-items-center border-black border-1 border box-border border-dashed">
      {
        showVisuals ? (<></>) : (<h1>{value}</h1>)
      }
    </div>
  );
}

export default function Home() {
  // * Setup Grid
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [grid, setGrid] = useState([]);
  const [colsClass, setColsClass] = useState("grid-cols-5");

  // * Other Parameters
  // ? Rasio orang dengan total grid - Dimodelkan dengan probabilitas adanya orang dalam tiap grid
  const [populationDensity, setPopulationDensity] = useState(0.5);
  // ? Rasio orang yang terinfeksi dengan total orang - Dimodelkan dengan probabilitas 1 orang membawa penyakit
  const [infectionRate, setInfectionRate] = useState(.1);
  // ? Ukuran seberapa menular penyakit - Dimodelkan dengan jarak neighborhood yang dapat tertular
  const [spreadRange, setSpreadRange] = useState(1);
  // ? Imunitas seseorang - Dimodelkan dengan probabilitas orang dalam jarak tertular, bisa tidak tertular
  const [immunityRate, setImmunityRate] = useState(0.5);

  // * Variables for Visual Needs
  const [showVisuals, setShowVisuals] = useState(true);


  // * Utility Variables
  const [refresh, setRefresh] = useState(false);

  // * Populate Grid
  useEffect(() => {
    const newGrid = [];
    for (let i = 0; i < rows * cols; i++) {
      const randomNumber = Math.random();
      console.log(randomNumber);
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

  return (
    <main className="bg-white min-h-screen relative flex flex-col justify-center items-center py-10">
      {/* <h1 className="text-center text-black text-2xl">Disease Spread Simulation</h1> */}
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="simulation-grid w-fit outline outline-1 outline-black" style={{"--grid-cols": cols}}>
          {
            grid.map((grid, i) => (
              <GridBox key={i} value={grid.value} index={i} />
            ))
          }
        </div>
        <div className="bg-black text-white cursor-pointer p-3" onClick={() => {
          setRefresh(!refresh);
        }}>
          Regenerate
        </div>
      </div>
    </main>
  );
}
