import { useEffect } from "react";
import Loading from "./components/Loading";
import useLoader from "./hooks/useLoader";
import "./styles.css";

export default function App() {
  const URL =
    "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge";
  const { flag, isLoading, loadDocument } = useLoader();

  useEffect(() => {
    loadDocument(URL);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="App">
      <h1>Flag</h1>
      <h2>{flag}</h2>
    </div>
  );
}
