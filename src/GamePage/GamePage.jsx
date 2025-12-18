//GamePage.jsx
import { Link } from "react-router-dom";
import Grid from "../Grid/Grid";

export default function GamePage() {
  return (
    <>
      <Link to="/">На главную</Link>
      <Grid />
    </>
  );
}
