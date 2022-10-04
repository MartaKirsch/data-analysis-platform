import React, { FC } from "react";
import { PageWrapper } from "../common/PageWrapper";
import NodesAside from "./NodesAside";

const Dashboard: FC = () => {
  return (
    <PageWrapper>
      <NodesAside />
    </PageWrapper>
  );
};

export default Dashboard;
