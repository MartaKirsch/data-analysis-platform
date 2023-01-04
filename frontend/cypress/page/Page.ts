import { Board } from "./Board";
import { NodeAside } from "./NodeAside";

export class Page {
  private readonly nodeAside = new NodeAside();
  private readonly board = new Board();

  public static visit() {
    cy.visit("");
    return new Page();
  }

  public getNodeAside() {
    return this.nodeAside;
  }

  public getBoard() {
    return this.board;
  }

  public placeDataNode(x?: number, y?: number) {
    const addDataNodeButton = this.nodeAside.getAddFileDataNode();
    const board = this.board.get();

    this.dragDrop(addDataNodeButton, board, x, y);
    return this;
  }

  public placeNaiveBayesNode(x?: number, y?: number) {
    const addNaiveBayesButton =
      this.nodeAside.getAddNaiveBayesCalculationNode();
    const board = this.board.get();

    this.dragDrop(addNaiveBayesButton, board, x, y);
    return this;
  }

  public placeDecisionTreeNode(x?: number, y?: number) {
    const addButton = this.nodeAside.getAddDecisionTreeCalculationNode();
    const board = this.board.get();

    this.dragDrop(addButton, board, x, y);
    return this;
  }

  public placeFileResultNode(x?: number, y?: number) {
    const addButton = this.nodeAside.getAddFileResultNode();
    const board = this.board.get();

    this.dragDrop(addButton, board, x, y);
    return this;
  }

  public placePlotResultNode(x?: number, y?: number) {
    const addButton = this.nodeAside.getAddPlotResultNode();
    const board = this.board.get();

    this.dragDrop(addButton, board, x, y);
    return this;
  }

  public placePredictionResultNode(x?: number, y?: number) {
    const addButton = this.nodeAside.getAddPredictionResultNode();
    const board = this.board.get();

    this.dragDrop(addButton, board, x, y);
    return this;
  }

  public dragDrop(
    draggedEl: Cypress.Chainable<undefined>,
    dropTargetEl: Cypress.Chainable<undefined>,
    x?: number,
    y?: number
  ) {
    const dataTransfer = new DataTransfer();
    draggedEl.trigger("dragstart", { dataTransfer });
    dropTargetEl.trigger("drop", { dataTransfer, x, y });
    draggedEl.trigger("dragend", { force: true });
    return this;
  }

  public uploadFile(filename: string) {
    this.board.getUploadDataInput().selectFile(filename);
    return this;
  }

  public closeModal() {
    this.board.getCloseModalButton().click();
    return this;
  }

  public selectClass(opt: string) {
    this.board.getClassSelect().select(opt);
    return this;
  }

  public ensureDownloadButtonExists(exists = true) {
    this.board.getDownloadButton().should(exists ? "exist" : "not.exist");
    return this;
  }

  public ensurePredictButtonExists(exists = true) {
    this.board.getPredictButton().should(exists ? "exist" : "not.exist");
    return this;
  }
}
