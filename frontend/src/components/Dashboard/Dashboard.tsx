import React, { FC } from "react";
import { PageWrapper } from "../common/PageWrapper";
import Board from "./Board";
import NodesAside from "./NodesAside";

const Dashboard: FC = () => {
  return (
    <PageWrapper>
      <NodesAside />
      <Board />
    </PageWrapper>
  );
};

export default Dashboard;
