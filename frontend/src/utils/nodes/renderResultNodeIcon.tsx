import { ReactComponent as ScatterPlotIcon } from "../../img/nodeIcons/scatter_plot.svg";
import { ResultType } from "../../types/Node";

export const renderResultNodeIcon = (resultType: ResultType) => {
  switch (resultType) {
    case ResultType.ScatterPlot:
      return <ScatterPlotIcon />;
  }
};
