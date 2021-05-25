import Header from "../Header/Header";
import TotMap from "../TotMap/TotMap";
import FooterUI from "../FooterUI/FooterUI";
import { getTotLocations } from "../../api";
import { useGlobal } from "../../context/globalContext";

const App = (props) => {
  const [state, dispatch] = useGlobal();

  // Load all of the tot location from the api into an array of objects
  const loadTotLocations = async (location) => {
    // check if the tots are currently loaded
    if (!state.totsLoaded) {
      // check if the user has dragged the map from their current location
      if (state.windowCenter) {
        location = state.windowCenter;
      }
      // API Call
      const totLocations = await getTotLocations(location);
      dispatch({
        type: "LOAD_TOTS",
        totLocations: totLocations,
      });
    }
  };

  // Add the window center to the state
  const windowMoved = (mapProps, map) => {
    const windowCenter = {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng(),
    };
    // prevent unnecessary setState
    if (state.totsLoaded) {
      dispatch({
        type: "RECENTER_MAP",
        totsLoaded: false,
        windowCenter: windowCenter,
      });
    }
  };

  return (
    <div className="App page bg-white">
      <Header />
      <TotMap
        id="TotMap"
        totsLoaded={state.totsLoaded}
        loadTotLocations={loadTotLocations}
        totLocations={state.totLocations}
        windowMoved={windowMoved}
      />
      <FooterUI loadTotLocations={loadTotLocations} />
    </div>
  );
};

export default App;
