import React from "react";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Buttons from './components/Buttons'
import CalProvider from "./context/CalcContext";

const btnValues = [
  ['C', '+-', '%', '/'],
  [7, 8, 9, 'X'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', '='],
]

const button = btnValues.flat().map((btn, index) => {
  return <Buttons key={index} value={btn} />
})

console.log(button)

function App() {
  return (
    <CalProvider>
      <Wrapper>
        <Screen />
        <ButtonBox button={button} />
      </Wrapper>
    </CalProvider>
  );
}

export default App;
