import { Page } from "../page/Page";

describe("Board", () => {
  let page: Page;
  beforeEach(() => {
    page = Page.visit();
  });

  it("should display dragged and dropped node", () => {
    page.placeDataNode();
    const dataNode = page.getBoard().getDataNode(0);
    dataNode.should("exist");
  });

  describe("Connections", () => {
    beforeEach(() => {
      page.placeDataNode(50, 50).placeNaiveBayesNode(150, 150);
      const dataNode = page.getBoard().getDataNode(0);
      const naiveBayesNode = page.getBoard().getCalcNode(1);
      page.dragDrop(dataNode, naiveBayesNode);
    });

    it("should display connection after d&d data node on calc node", () => {
      page.getBoard().getConnectionBars().should("have.length", 1);
    });

    it("should not display connection after click on it", () => {
      page.getBoard().getConnectionBars().click();
      page.getBoard().getConnectionBars().should("have.length", 0);
    });
  });

  describe("Node connection blocking", () => {
    it("blocks from connecting 2 data nodes to one calc node", () => {
      page
        .placeDataNode(50, 50)
        .placeDataNode(150, 50)
        .placeNaiveBayesNode(100, 150);
      const dataNode1 = page.getBoard().getDataNode(0);
      const dataNode2 = page.getBoard().getDataNode(1);
      const naiveBayesNode = page.getBoard().getCalcNode(2);

      page
        .dragDrop(dataNode1, naiveBayesNode)
        .dragDrop(dataNode2, naiveBayesNode)
        .getBoard()
        .getConnectionBars()
        .should("have.length", 1);
    });

    it("blocks from connecting 2 calc nodes to one result node", () => {
      page
        .placeNaiveBayesNode(50, 50)
        .placeNaiveBayesNode(150, 50)
        .placeFileResultNode(100, 150);
      const calcNode1 = page.getBoard().getCalcNode(0);
      const calcNode2 = page.getBoard().getCalcNode(1);
      const fileResultNode = page.getBoard().getResultNode(2);

      page
        .dragDrop(calcNode1, fileResultNode)
        .dragDrop(calcNode2, fileResultNode)
        .getBoard()
        .getConnectionBars()
        .should("have.length", 1);
    });
  });

  it("displays result after connecting whole tree correctly", () => {
    page
      .placeDataNode(10, 10)
      .placeDecisionTreeNode(90, 90)
      .placeFileResultNode(10, 180)
      .placePlotResultNode(90, 180)
      .placePredictionResultNode(180, 180);
    const dataNode = page.getBoard().getDataNode(0);
    const decisionTreeNode = page.getBoard().getCalcNode(1);
    const fileResultNode = page.getBoard().getResultNode(2);
    const plotResultNode = page.getBoard().getResultNode(3);
    const predictionResultNode = page.getBoard().getResultNode(4);

    fileResultNode.click();
    page.ensureDownloadButtonExists(false).closeModal();
    plotResultNode.click();
    page.ensureDownloadButtonExists(false).closeModal();
    predictionResultNode.click();
    page.ensurePredictButtonExists(false).closeModal();

    page
      .dragDrop(dataNode, decisionTreeNode)
      .dragDrop(decisionTreeNode, fileResultNode)
      .dragDrop(decisionTreeNode, plotResultNode)
      .dragDrop(decisionTreeNode, predictionResultNode);

    dataNode.click();
    page.uploadFile("./cypress/fixtures/iris2.csv").closeModal();

    fileResultNode.click();
    page.ensureDownloadButtonExists(false).closeModal();
    plotResultNode.click();
    page.ensureDownloadButtonExists(false).closeModal();
    predictionResultNode.click();
    page.ensurePredictButtonExists(false).closeModal();

    decisionTreeNode.click();
    page.selectClass("Species").closeModal();

    fileResultNode.click();
    page.ensureDownloadButtonExists().closeModal();
    plotResultNode.click();
    page.ensureDownloadButtonExists().closeModal();
    predictionResultNode.click();
    page.ensurePredictButtonExists();
  });
});
