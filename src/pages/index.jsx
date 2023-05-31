import Image from "next/image";
import { useEffect, useState } from "react";

function GridBox({value}) {
  return (
    <div className="w-[40px] !aspect-square font-bold grid place-items-center border-black border-1 border box-border bg-red-500">
      {value}
    </div>
  );
}

export default function Home() {
  // ? Setup Grid
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(15);
  const [grid, setGrid] = useState([]);
  const [colsClass, setColsClass] = useState("grid-cols-5");

  useEffect(() => {
    const newGrid = [];
    for (let i = 0; i < rows * cols; i++) {
      newGrid.push({
        value: Math.floor(Math.random() * (2 - 0 + 1) + 0),
      });
    }
    setGrid(newGrid);
  }, [rows, cols]);

  // ? Other Parameters
  // ? Rasio orang dengan total grid - Dimodelkan dengan probabilitas adanya orang dalam tiap grid
  const [populationDensity, setPopulationDensity] = useState(0.5);
  // ? Rasio orang yang terinfeksi dengan total orang - Dimodelkan dengan probabilitas 1 orang membawa penyakit
  const [infectionRate, setInfectionRate] = useState(0.5);
  // ? Ukuran seberapa menular penyakit - Dimodelkan dengan jarak neighborhood yang dapat tertular
  const [spreadRange, setSpreadRange] = useState(1);
  // ? Imunitas seseorang - Dimodelkan dengan probabilitas orang dalam jarak tertular, bisa tidak tertular
  const [immunityRate, setImmunityRate] = useState(0.5);

  return (
    <main className="bg-white min-h-screen relative">
      <h1 className="text-center text-black text-2xl">Disease Spread Simulation</h1>
      <div className="flex justify-center items-center">
        <div className="simulation-grid w-fit" style={{"--grid-cols": cols}}>
          {
            grid.map((grid, i) => (
              <GridBox key={i} value={grid.value}  />
            ))
          }
        </div>
      </div>
    </main>
  );
}
