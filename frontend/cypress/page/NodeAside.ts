export class NodeAside {
  public getAddFileDataNode() {
    return cy.getByData("add-file-data-node");
  }

  public getAddNaiveBayesCalculationNode() {
    return cy.getByData("add-naive-bayes-calculation-node");
  }

  public getAddDecisionTreeCalculationNode() {
    return cy.getByData("add-decision-tree-calculation-node");
  }

  public getAddFileResultNode() {
    return cy.getByData("add-file-result-node");
  }

  public getAddPlotResultNode() {
    return cy.getByData("add-plot-result-node");
  }

  public getAddPredictionResultNode() {
    return cy.getByData("add-prediction-result-node");
  }
}
