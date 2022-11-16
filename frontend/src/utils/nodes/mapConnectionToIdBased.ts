import { Connection, IdBasedConnection } from "../../types/Connection";

export const mapConnectionToIdBased = (
  connection: Connection
): IdBasedConnection => [connection[0].id, connection[1].id];
