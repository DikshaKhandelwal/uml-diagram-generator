import { useEffect, useState } from "react";
import getMessage from "./utils/api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getMessage({}).then((response) => setMessage(response.data.message));
  }, []);

  return <h1>{message}</h1>;
}

export default App;
