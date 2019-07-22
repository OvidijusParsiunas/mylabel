let defaultState = false;
let removingPolygonPointsState = false;
let addingPolygonPointsState = false;
let movableObjectsState = true;
let continuousDrawingState = false;
let lastDrawingModeState = null;
let readyToDrawShapeState = false;
let hasDrawnShapeState = false;
let cancelledReadyToDrawState = null;
let removingPointsAfterCancelDrawState = null;
let labelsVisibilityState = true;

function getDefaultState() {
  return defaultState;
}

function getAlteringPolygonPointsState() {
  return removingPolygonPointsState || addingPolygonPointsState;
}

function getRemovingPolygonPointsState() {
  return removingPolygonPointsState;
}

function getAddingPolygonPointsState() {
  return addingPolygonPointsState;
}

function getMovableObjectsState() {
  return movableObjectsState;
}

function getContinuousDrawingState() {
  return continuousDrawingState;
}

function getLastDrawingModeState() {
  return lastDrawingModeState;
}

function getReadyToDrawShapeState() {
  return readyToDrawShapeState;
}

function getHasDrawnShapeState() {
  return hasDrawnShapeState;
}

function getCancelledReadyToDrawState() {
  return cancelledReadyToDrawState;
}

function getRemovingPointsAfterCancelDrawState() {
  return removingPointsAfterCancelDrawState;
}

function getLabelsVisibilityState() {
  return labelsVisibilityState;
}

function setDefaultState(state) {
  defaultState = state;
}

function setAlteringPolygonPointsState(state) {
  removingPolygonPointsState = state;
  addingPolygonPointsState = state;
}

function setRemovingPolygonPointsState(state) {
  removingPolygonPointsState = state;
}

function setAddingPolygonPointsState(state) {
  addingPolygonPointsState = state;
}

function setMovableObjectsState(state) {
  movableObjectsState = state;
}

function setContinuousDrawingState(state) {
  continuousDrawingState = state;
}

function setLastDrawingModeState(state) {
  lastDrawingModeState = state;
}

function setReadyToDrawShapeState(state) {
  readyToDrawShapeState = state;
}

function setHasDrawnShapeState(state) {
  hasDrawnShapeState = state;
}

function setCancelledReadyToDrawState(state) {
  cancelledReadyToDrawState = state;
}

function setRemovingPointsAfterCancelDrawState(state) {
  removingPointsAfterCancelDrawState = state;
}

function setLabelsVisibilityState(state) {
  labelsVisibilityState = state;
}

export {
  getDefaultState,
  setDefaultState,
  getHasDrawnShapeState,
  setHasDrawnShapeState,
  getMovableObjectsState,
  setMovableObjectsState,
  getLastDrawingModeState,
  setLastDrawingModeState,
  getReadyToDrawShapeState,
  setReadyToDrawShapeState,
  getLabelsVisibilityState,
  setLabelsVisibilityState,
  getContinuousDrawingState,
  setContinuousDrawingState,
  getAddingPolygonPointsState,
  setAddingPolygonPointsState,
  getCancelledReadyToDrawState,
  setCancelledReadyToDrawState,
  getAlteringPolygonPointsState,
  setAlteringPolygonPointsState,
  getRemovingPolygonPointsState,
  setRemovingPolygonPointsState,
  getRemovingPointsAfterCancelDrawState,
  setRemovingPointsAfterCancelDrawState,
};
