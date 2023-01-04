export class Board {
  public get() {
    return cy.getByData("board");
  }

  public getConnectionBars() {
    return cy.getByData("connection-bar");
  }

  public getDataNode(index: number) {
    return cy.getByData(`${index.toString()}-data-node`);
  }

  public getCalcNode(index: number) {
    return cy.getByData(`${index.toString()}-calculation-node`);
  }

  public getResultNode(index: number) {
    return cy.getByData(`${index.toString()}-result-node`);
  }

  public getUploadDataModal() {
    return cy.getByData("file-data-modal");
  }

  public getUploadDataInput() {
    return cy.getByData("file-upload-input");
  }

  public getFileResultModal() {
    return cy.getByData("file-result-modal");
  }

  public getPlotResultModal() {
    return cy.getByData("plot-result-modal");
  }

  public getPredictionResultModal() {
    return cy.getByData("prediction-result-modal");
  }

  public getUploadFileInput() {
    return cy.getByData("file-upload-input");
  }

  public getCloseModalButton() {
    return cy.getByData("close-modal");
  }

  public getClassSelect() {
    return cy.getByData("class-select");
  }

  public getDownloadButton() {
    return cy.getByData("download-button");
  }

  public getPredictButton() {
    return cy.getByData("predict-button");
  }
}
