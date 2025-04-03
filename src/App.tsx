import React from "react";
import "./App.css";
import MainView from "./components/MainView";
import { LoadExamplePrompts } from './helpers/LoadExamplePrompts'

LoadExamplePrompts()

function App() {
  return (
    <>
      <MainView />
    </>
  );
}

export default App;
