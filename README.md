# Modelling the Spread of a Pandemic

**Made for Modelling and Simulation assignment.**

****************************************************Deployment available at [https://disease-spread-simulation.vercel.app/](https://disease-spread-simulation.vercel.app/).**

****GitHub Repository**** https://github.com/ahmadzaki2975/Pandemic-Spread-Simulation.

## 👥 Team Members

- @Difta Fitrahul Qihaj  - 21/480096/TK/52975
- @Ahmad Zaki Akmal  - 21/480179/TK/52981

## 🎑 Background

Back in late 2019, the world was struck by the COVID-19 pandemic caused by the infectious SARS-CoV-2 virus. This unexpected event highlighted the unpredictability and devastating impact of a global pandemic. We are now reminded that there might be another virus lurking in the shadows to unleash another outbreak in the future, and it becomes crucial to understand the characteristics of pandemics and develop effective strategies to combat them.

The objective of this project is to simulate the spread of a pandemic through a group of individuals in different conditions. By analyzing the dynamics and characteristics of the pandemic in various conditions, we aim to identify key factors that contribute to its spread and develop strategies to effectively mitigate its impact depending on the impacted area.

With this project, we strive to contribute and help prepare the world for another pandemic in the future. By understanding the characteristics of a pandemic's spread in different conditions, we can construct the best strategies to effectively combat and mitigate the impact of potential outbreaks.

## 📜 Modelling Theories

To model the spread of a pandemic in different scenarios, we did some research and found out that there are a number of factor contributing to how fast the pandemic spreads.

1. **Population Density**

The first factor that contributes to how fast the pandemic spreads is the population density of a region. By logic, a longer distance from the source of disease would make it harder to spread. But in a highly dense population, creating some distance from each other can be hard and thus the disease can spread faster.

Based on a research, a comparation of 4 regions with different population densities, the following result is gained.

![The spread rates of SARS-CoV-2 in four regions from 1 March 2020 to 30 June 2020. The four regions are categorized by population density from low to high.](Modelling%20the%20Spread%20of%20a%20Pandemic%20041a539cfe55434b90de282fc7f20d25/Untitled.png)

The spread rates of SARS-CoV-2 in four regions from 1 March 2020 to 30 June 2020. The four regions are categorized by population density from low to high.

Then the research concluded with:

> “This study has proved that the spread rate of SARS-CoV-2 is strongly associated with population density, and diversified control and prevention measures should be made for different regions according to population density.” [1]
> 

1. **The Infectiousness of the Virus**

The infectiousness or transmissibility of the virus plays a significant role in the speed of virus. A highly contagious pathogen can easily transmit from person to person, resulting in rapid transmission and widespread dissemination. However, each disease has a different infectiousness and depending on that, the spread can be fast or slow. 

1. **Health Quality and Hygiene Levels**

Another factor that contributes to the spread of the pandemic is the health quality and hygiene levels. This is supported by a journal stating:

> “This systematical review identified the impacts and challenges of COVID-19 in the provision of Water, Sanitation, and Hygiene (WASH) services. The results implied that COVID-19 has significant impacts on WASH services that can affect the health of the public. Therefore, strengthening and ensuring access to WASH services are important for preventing COVID-19 and realizing human rights.” [2]
> 

![Untitled](Modelling%20the%20Spread%20of%20a%20Pandemic%20041a539cfe55434b90de282fc7f20d25/Untitled%201.png)

During the initial phase of the pandemic, the virus spread rapidly and caused an exponential growth curve. This was due to various factors, including the three factors mentioned above. After reaching its peak, the number of cases began to decrease, and the virus became endemic. As shown in the image above, a higher value of R0 (which is the rate of virus spread) results in a higher peak or incidence of cases. However, we also notice that the time taken for the virus to spread and reach its peak is shorter for higher incidence cases. This is because for higher incidence cases, handling the virus becomes faster and the behavior and health of people change more rapidly. [3]

********************References********************

[1] Ke Chen, PhD , Zhenghao Li, MSc, The spread rate of SARS-CoV-2 is strongly associated with population density, *Journal of Travel Medicine*, Volume 27, Issue 8, December 2020, taaa186, [https://doi.org/10.1093/jtm/taaa186](https://doi.org/10.1093/jtm/taaa186)

[2] Desye B. COVID-19 Pandemic and Water, Sanitation, and Hygiene: Impacts, Challenges, and Mitigation Strategies. *Environ Health Insights*. 2021;15:11786302211029447. Published 2021 Jul 14. doi:10.1177/11786302211029447

[3] Outbreak Research Modelling Team (Pan-InfORM), P. I. (n.d.). *Modelling an influenza pandemic: A guide for the perplexed*. PubMed Central (PMC). https://doi.org/10.1503/cmaj.090885

## 📝 System Modelling

### 1. Planning and Requirements

This model’s main goal is to simulate how a pandemic spreads in a region of varying factors explained in the theories above. So based on it, the model has the following requirements.

- Able to customize population density. This will be achieved by customizing the size of the area or the probability that a person occupies a cell.
- Able to customize infectiousness factor. This will be modelled by the probability that the virus will infect neighboring individuals.
- Able to customize the health factor of the people within the area.

********Grid Generation Phase********

The area which the individuals live within is modelled with grid of cells with a square shape (n × n). It will be populated within the grid generation phase by people of healthy and infected people based on their respective probability.

Each cell will have different state that determines its conditions, list of the states and the condition that it represents is as follows.

- 0 : Represents the empty state, meaning that space is not occupied by any individual.
- 1 : Represents a space occupied by a healthy person.
- 2 : Represents a space occupied by an infected person.
- 3: Represent a space occupied by an immune person, a person recovered from the disease.

Along with the state of the cell, a random number will be generated and assigned to each person as their durability level.

****************************Simulation Phase****************************

The simulation phase starts after the grid generation phase. Infection will spread from the disease carrier (initially infected person) to its neighboring cells. Whether the infection spreads or not depends on the infectiousness factor and the durability of the neighbor cell. 

Each infected cell will have a chance to recover after a set amount of iterations, and this chance increases linearly as iterations increases.

The simulation ends if there are no infected person in the area.

### 2. Assumptions

To simplify our model, we made the following assumptions.

- The infection can only spread 1 tiles away from the infected cell, this includes diagonal directions or known as the Moore neighborhood.
    
    ![The Moore neighborhood is composed of a central cell and the eight cells which surround it. [Wikipedia](https://en.wikipedia.org/wiki/Moore_neighborhood)](Modelling%20the%20Spread%20of%20a%20Pandemic%20041a539cfe55434b90de282fc7f20d25/Untitled%202.png)
    
    The Moore neighborhood is composed of a central cell and the eight cells which surround it. [Wikipedia](https://en.wikipedia.org/wiki/Moore_neighborhood)
    
- All infected person will roll a random number every 3 iterations and then compared to their durability to determine their recoveries.
- Recovery probabilities increases by 0.001 of iteration count.
- Every infected person that recovers will gain 100% immunity to the disease.

### 3. Implementation

We chose to build the model within a web-based environment, meaning majority of the algorithm and logics are made using JavaScript and the visuals are shown using HTML and CSS.

********************Algorithms********************

This section will only explain algorithms that are directly related to the logic of the simulation, and will not include algorithms used for visual needs.

- Variables definition and initialization

```jsx
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
  const [iteration, setIteration] = useState(0)

  // * Variables for Visual Needs
  const [showVisuals, setShowVisuals] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showLiveChart, setShowLiveChart] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [infectedArray, setInfectedArray] = useState([0]);

  // * Utility Variables
  const [refresh, setRefresh] = useState(false);
```

- Grid Generation Phase

```jsx
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
            Math.random() * (Number(maxDurability) - Number(minDurability)) + Number(minDurability);
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
```

- Simulation Phase

```jsx
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
            randomNumber < (newGrid[row][col].durability + (iteration/1000)) &&
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
```

**********Source Code**********

The complete source code for this simulation can be viewed in the following GitHub repository.

[https://github.com/ahmadzaki2975/Pandemic-Spread-Simulation](https://github.com/ahmadzaki2975/Pandemic-Spread-Simulation)

The deployment of the simulation can be accessed in the following link.

[https://disease-spread-simulation.vercel.app](https://disease-spread-simulation.vercel.app/)

### 4. Preview of the Simulation

![Preview of the settings menu to set customizable variables.](Modelling%20the%20Spread%20of%20a%20Pandemic%20041a539cfe55434b90de282fc7f20d25/Untitled%203.png)

Preview of the settings menu to set customizable variables.

[A recording of a simulation with grid size 10x10.](Modelling%20the%20Spread%20of%20a%20Pandemic%20041a539cfe55434b90de282fc7f20d25/2023-06-04_11-43-30.mp4)

A recording of a simulation with grid size 10x10.

[A recording of a simulation with grid size 20x20.](Modelling%20the%20Spread%20of%20a%20Pandemic%20041a539cfe55434b90de282fc7f20d25/2023-06-04_13-01-20.mp4)

A recording of a simulation with grid size 20x20.

### 5. Conclusion and Insights

After running the simulation a few times with different values of variables, we observed and analyzed the results, giving these notable points.

- A high density population does make the spread faster as 1 infected individual can spread to more individuals. This case also results in high peak of infection count. On the other side, a low density population, in most cases, results in a very low peak infection count and ends within less than 10 iterations.
- An area with good health quality levels (with people more durable) results in a very short duration of simulation and low peak infection count.
- Interestingly, our analysis revealed that the relationship between virus infectiousness and the overall outcome is not straightforward. Factors such as population density and individual resistance levels can influence the effectiveness of infectiousness. Thus, a high infectiousness rate does not always translate into a more severe pandemic outcome, especially in scenarios where the virus struggles to reach susceptible individuals due to low population density.

Overall, the model can simulate results that align with the theoretical understanding of pandemic spread based on the variables and assumptions considered. However, it is important to acknowledge that the model has its limitations and may not capture the full complexity and intricacies of real-world pandemics, as we have assumed somethings to simplify the model.

In conclusion, while the model provides valuable insights and helps us explore different scenarios, it is essential to interpret its results cautiously and consider them as part of a broader decision-making process. Continued research, data collection, and refinement of models are necessary to enhance our understanding and response to real-world pandemics.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
