import "@scss/main.scss";
import HomePage from "@views/home-page/home-page";
import { useEffect, useRef, useState } from "react";

export type dataPropsElem = {
  date: string;
  "errors-500": number;
  "errors-501": number;
  "errors-502": number;
  "errors-other": number;
  zeros: number;
  timeouts: number;
};

function App() {
  const data = useRef<dataPropsElem[]>([]);
  const url = "data.json";
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res: dataPropsElem[]) => {
        data.current = [...res];
        setLoad(true);
      });
  }, []);

  return load ? <HomePage {...data.current} /> : "loading";
}

export default App;
