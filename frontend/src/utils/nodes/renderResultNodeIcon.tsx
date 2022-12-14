import { ReactComponent as PlotIcon } from "../../img/nodeIcons/plot.svg";
import { ReactComponent as FileIcon } from "../../img/nodeIcons/file.svg";
import { ReactComponent as PredictionIcon } from "../../img/nodeIcons/prediction.svg";
import { ResultType } from "../../types/Node";

export const renderResultNodeIcon = (resultType: ResultType) => {
  switch (resultType) {
    case ResultType.Plot:
      return <PlotIcon />;
    case ResultType.File:
      return <FileIcon />;
    case ResultType.Prediction:
      return <PredictionIcon />;
  }
};
