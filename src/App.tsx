import "./App.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import HomePage from "./HomePage";
import { persistor, store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <HomePage />
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
