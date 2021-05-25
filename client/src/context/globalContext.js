import { createContext, useContext, useReducer } from "react";

const globalContext = createContext();
const { Provider } = globalContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_MARKER":
      return {
        ...state,
        activeMarker: action.activeMarker,
        selectedPlace: action.selectedPlace,
      };
    case "GET_CURRENT_POSITION":
      return {
        ...state,
        loading: false,
        userLocation: action.userLocation,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "RECENTER_MAP":
      return {
        ...state,
        totsLoaded: false,
        windowCenter: action.windowCenter,
      };
    case "LOAD_TOTS":
      return {
        ...state,
        totsLoaded: true,
        totLocations: action.totLocations,
      };
    default:
      return state;
  }
};

const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    totsLoaded: false,
    // array of tot locations
    totLocations: [],
    windowCenter: null,
    loading: true,
    infoWindowVisible: false,
    selectedPlace: {},
    activeMarker: {},
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useGlobal = () => useContext(globalContext);

export { useGlobal, GlobalProvider };
