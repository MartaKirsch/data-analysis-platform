import { NodeType } from "./Node";

export type Connection = [ConnectionItem, ConnectionItem];

export type ConnectionItem = {
  id: string;
  nodeType: NodeType;
};

export type IdBasedConnection = [string, string];
