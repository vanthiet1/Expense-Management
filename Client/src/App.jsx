import Router from "./routers/Router";
import { Route, Routes } from "react-router-dom";
const App = () => {

  return (
    <>




      <Routes>
        {Router.map((page, index) => (
          <Route
            key={index}
            path={page.path}
            Component={page.Component}
          >
          </Route>
        ))}
      </Routes>



    </>
  );
};

export default App;