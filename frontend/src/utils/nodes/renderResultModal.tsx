import FileResultModal from "../../components/Modals/FileResultModal";
import PlotResultModal from "../../components/Modals/PlotResultModal";
import PredictionResultModal from "../../components/Modals/PredictionResultModal";
import { ResultType } from "../../types/Node";

export const renderResultModal = (
  resultType: ResultType,
  onCloseModal: () => void,
  calculationNodeId: string,
  id: string
) => {
  switch (resultType) {
    case ResultType.Plot:
      return (
        <PlotResultModal
          onClose={onCloseModal}
          calculationNodeId={calculationNodeId}
          id={id}
        />
      );
    case ResultType.File:
      return (
        <FileResultModal
          onClose={onCloseModal}
          calculationNodeId={calculationNodeId}
          id={id}
        />
      );
    case ResultType.Prediction:
      return (
        <PredictionResultModal
          onClose={onCloseModal}
          calculationNodeId={calculationNodeId}
          id={id}
        />
      );
    default:
      return <></>;
  }
};
