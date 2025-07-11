
import AppHeader from "./components/AppHeader";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import { useState } from "react";


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <>
      <AppHeader />
      <TaskList />
    </>
  );
}

export default App;