import BarChart from "./BarChart";
import MixedChart from "./MixedChart";
import StackChart from "./StackChart";
function ChartFactory({ type }) {
  switch (type) {
    case Bar:
      return <BarChart />;
    case Mix:
      return <MixedChart />;
    case Stack:
      return <StackChart />;
    default:
      console.error("No Chart type found");
      return null;
  }
}

export default ChartFactory;
export const Bar = "bar"
export const Mix = "mix"
export const Stack = "stack"

