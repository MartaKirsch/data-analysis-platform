import React, { FC, useRef } from "react";
import { PageWrapper } from "../common/PageWrapper";
import Board from "./Board";
import NodesAside from "./NodesAside";

const Dashboard: FC = () => {
  const addFileDataNodeButtonRef = useRef<HTMLDivElement>(null);
  const addSumCalculationNodeButtonRef = useRef<HTMLDivElement>(null);

  return (
    <PageWrapper>
      <NodesAside
        addFileDataNodeButtonRef={addFileDataNodeButtonRef}
        addSumCalculationNodeButtonRef={addSumCalculationNodeButtonRef}
      />
      <Board
        addFileDataNodeButtonRef={addFileDataNodeButtonRef}
        addSumCalculationNodeButtonRef={addSumCalculationNodeButtonRef}
      />
    </PageWrapper>
  );
};

export default Dashboard;
