import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import StepNavigation from "./screens/SelectionScreen";
import { Provider } from "react-redux";
import Store from "./redux/store";
import AIChatScreen from "./screens/AIChat";

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route path="/" element={<StepNavigation />}></Route>
          <Route path="/aiChat" element={<AIChatScreen />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
