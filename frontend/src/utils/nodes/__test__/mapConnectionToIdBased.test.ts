import { Connection, IdBasedConnection } from "../../../types/Connection";
import { NodeType } from "../../../types/Node";
import { mapConnectionToIdBased } from "../mapConnectionToIdBased";

describe("mapConnectionToIdBased", () => {
  it("should map connection to id based connection properly", () => {
    // arrange
    const connection: Connection = [
      { id: "1", nodeType: NodeType.Calculation },
      { id: "2", nodeType: NodeType.Data },
    ];
    const expectedResult: IdBasedConnection = ["1", "2"];

    // act
    const result = mapConnectionToIdBased(connection);

    // assert
    expect(result).toEqual(expectedResult);
  });
});
