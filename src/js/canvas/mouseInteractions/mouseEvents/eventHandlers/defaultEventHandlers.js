import {
  polygonMouseDownEvents, polygonMouseUpEvents, polygonMoveEvents,
  polygonMouseOutEvents, pointMouseOverEvents, setEditPolygonEventObjects,
  boundingBoxScalingEvents, boundingBoxMouseOutEvents,
} from '../eventWorkers/editPolygonEventsWorker';

// not just for polygon
function assignDefaultEvents(canvas, polygonId, afterAddPoints) {
  setEditPolygonEventObjects(canvas, polygonId, afterAddPoints);

  canvas.on('mouse:down', (e) => {
    polygonMouseDownEvents(e);
  });

  canvas.on('mouse:up', (e) => {
    polygonMouseUpEvents(e);
  });

  canvas.on('object:moving', (e) => {
    polygonMoveEvents(e);
  });

  canvas.on('object:scaling', (e) => {
    boundingBoxScalingEvents(e);
  });

  canvas.on('mouse:over', (e) => {
    pointMouseOverEvents(e);
  });

  // edit this
  canvas.on('mouse:out', (e) => {
    if (e.target && e.target.shapeName !== 'point') {
      if (e.target.shapeName === 'bndBox') {
        boundingBoxMouseOutEvents(e);
      } else if (e.target.shapeName === 'polygon') {
        polygonMouseOutEvents(e);
      }
      canvas.renderAll();
    }
  });
}

export { assignDefaultEvents as default };
