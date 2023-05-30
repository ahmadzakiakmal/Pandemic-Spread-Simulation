import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [shipNet, setShipNet] = useState(
    Math.floor(Math.random() * (3 - -3 + 1)) + -3
  );

  useEffect(() => {
    setInterval(() => {
      setShipNet(Math.floor(Math.random() * (3 - -3 + 1)) + -3);
    }, 10000)

    return () => {
      clearInterval();
    }
  }, []);

  return (
    <main className="bg-white min-h-screen flex justify-center items-center relative">
      {/* The Sea */}
      <div className="bg-[#3295A3]/60 w-full absolute bottom-0 h-[20vh] z-[2]"></div>
      {/* Port */}
      <div className="bg-slate-600 w-[40%] absolute bottom-0 h-[25vh]">
        {/* Crane */}
        <div className="h-[300px] w-[40px] bg-[#BC8E16] absolute bottom-[100%] right-0 rounded-t-full">
          <div className="h-[40px] w-[200px] bg-[#BC8E16] absolute bototm-[100%] right-[-20px] rounded-full"></div>
        </div>
        {/* Cargos */}
        <div className="bg-red-500/60 bottom-[100%] absolute grid grid-cols-5 !gap-0 place-items-center">
          <div className="aspect-square w-[40px] bg-green-500"></div>
          <div className="aspect-square w-[40px] bg-blue-500"></div>
          <div className="aspect-square w-[40px] bg-yellow-500"></div>
          <div className="aspect-square w-[40px] bg-green-700"></div>
          <div className="aspect-square w-[40px] bg-red-800"></div>
          <div className="aspect-square w-[40px] bg-green-500"></div>
          <div className="aspect-square w-[40px] bg-blue-500"></div>
          <div className="aspect-square w-[40px] bg-yellow-500"></div>
          <div className="aspect-square w-[40px] bg-green-700"></div>
          <div className="aspect-square w-[40px] bg-red-800"></div>
          <div className="aspect-square w-[40px] bg-green-500"></div>
          <div className="aspect-square w-[40px] bg-blue-500"></div>
          <div className="aspect-square w-[40px] bg-yellow-500"></div>
          <div className="aspect-square w-[40px] bg-green-700"></div>
          <div className="aspect-square w-[40px] bg-red-800"></div>
          <h1 className="absolute font-bold drop-shadow-[0_0_5px_#000000] text-center">
            Amount: <br /> 0
          </h1>
        </div>
      </div>
      {/* Ship */}
      <div className="bg-slate-900 w-[100px] h-[50px] absolute bottom-[17vh] right-[100%] animate-translate">
        <h1 className="text-center h-min">{shipNet}</h1>
      </div>
    </main>
  );
}
