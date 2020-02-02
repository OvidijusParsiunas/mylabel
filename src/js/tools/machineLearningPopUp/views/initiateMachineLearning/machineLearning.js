import { getAllImageData } from '../../../imageList/imageList';
import { drawTempShapesToShowCaseMLResults, updateImageThumbnails } from '../../../toolkit/buttonClickEvents/facadeWorkersUtils/drawShapesViaCoordinates/drawShapesViaCoordinates';
import { getCurrentImageId } from '../../../toolkit/buttonClickEvents/facadeWorkersUtils/stateManager';
import {
  displayErrorMessage, updateProgressMessage, removeCancelButton, displayNoImagesFoundInfo,
  displayNextButton, displayRetryButton, changeToLoadingStyle, removeLoadingContent,
} from './style';

let tfModel = null;
let isInProgress = false;
let isCancelled = false;
let modelLoadingInitiated = false;
const tensorflowJSScript = { element: document.createElement('script'), status: { download: 'waiting' } };
const cocoSSDScript = { element: document.createElement('script'), status: { download: 'waiting' } };

function errorHandler() {
  removeLoadingContent();
  displayErrorMessage('ERROR! Something went wrong, please try again later.');
  displayRetryButton();
  isInProgress = false;
}

function predict(image) {
  return tfModel.detect(image.data);
}

// check bounding box overflow overflow
// check the memory leak, need parition

function isObjectEmpty(object) {
  return Object.keys(object).length === 0 && object.constructor === Object;
}

function executeAndRecordPredictionResults(promisesArray, predictionIdToImageId,
  nextViewCallback, setMachineLearningData, coverage) {
  Promise.all(promisesArray)
    .then((predictions) => {
      // opportunity for remembering the last changed label names by moving
      // this object outside of the function
      const predictedImageCoordinates = {};
      for (let i = 0; i < predictions.length; i += 1) {
        predictedImageCoordinates[predictionIdToImageId[i]] = predictions[i];
      }
      setMachineLearningData(predictedImageCoordinates);
      removeLoadingContent();
      removeCancelButton();
      if (isObjectEmpty(predictedImageCoordinates)) {
        nextViewCallback();
      } else {
        displayNextButton();
        if (coverage === 'all'
        || (coverage === 'new' && Object.prototype.hasOwnProperty.call(predictedImageCoordinates, getCurrentImageId()))) {
          drawTempShapesToShowCaseMLResults(predictedImageCoordinates);
        }
        updateImageThumbnails(predictedImageCoordinates);
        updateProgressMessage('Finished!');
      }
      isInProgress = false;
    }).catch((error) => {
      console.log(error);
      errorHandler();
    });
}

// decided not to store generated shapes because if you have 100 images with
// 100s of shapes, it would lead to significant memory usage
function makePredictionsForAllImages(nextViewCallback, setMachineLearningData, coverage) {
  const predictPromises = [];
  const allImageData = getAllImageData();
  const predictionIdToImageId = [];
  // optimisation for not generating shapes on untouched images taken out
  // as when displaying the generated label names, only the new name label
  // names were shown, but when looked at image, all of them were there
  // this did not look right in terms of UX
  // Optimisation description:
  // only predicting images with no highlighted shapes and current image
  // as it can have partial highlighting, so predicting all again
  // 12/01/2020
  for (let i = 0; i < allImageData.length; i += 1) {
    const image = allImageData[i];
    if (coverage === 'all' || (coverage === 'new' && !image.analysedByML)) {
      image.analysedByML = true;
      predictPromises.push(predict(image));
      predictionIdToImageId.push(i);
    }
  }
  executeAndRecordPredictionResults(predictPromises, predictionIdToImageId,
    nextViewCallback, setMachineLearningData, coverage);
}

function markScriptDownloadSuccessfull(status) {
  status.download = 'complete';
}

function loadModel(status) {
  markScriptDownloadSuccessfull(status);
  return new Promise((resolve, reject) => {
    if (isCancelled) return;
    const { cocoSsd } = window;
    if (!modelLoadingInitiated) {
      modelLoadingInitiated = true;
      cocoSsd.load().then((model) => {
        tfModel = model;
        if (isCancelled) return;
        resolve();
      }).catch(() => {
        modelLoadingInitiated = false;
        reject();
      });
    }
  });
}

function downloadScript({ element, status }, url, resolve, reject) {
  if (isCancelled) return;
  if (status.download === 'complete') {
    resolve(status);
    return;
  }
  if (status.download === 'in_progress') {
    document.head.removeChild(element);
  }
  element.onload = resolve.bind(this, status);
  element.onerror = reject;
  status.download = 'in_progress';
  element.src = url;
  document.head.appendChild(element);
}

function downloadCOCOSSD(status) {
  markScriptDownloadSuccessfull(status);
  return new Promise((resolve, reject) => {
    downloadScript(cocoSSDScript, 'https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd',
      resolve, reject);
  });
}

function downloadTensorflowJS() {
  return new Promise((resolve, reject) => {
    downloadScript(tensorflowJSScript, 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs',
      resolve, reject);
  });
}

function startMachineLearning(nextViewCallback, setMachineLearningData, coverage) {
  if (isCancelled) { isCancelled = false; }
  const allImageData = getAllImageData();
  if (allImageData.length > 0) {
    changeToLoadingStyle();
    if (!tfModel) {
      isInProgress = true;
      downloadTensorflowJS()
        .then(resultScriptStatus => downloadCOCOSSD(resultScriptStatus))
        .then(resultScriptStatus => loadModel(resultScriptStatus))
        .then(() => makePredictionsForAllImages(nextViewCallback, setMachineLearningData, coverage))
        .catch(() => errorHandler());
    } else {
      makePredictionsForAllImages(nextViewCallback, setMachineLearningData, coverage);
    }
  } else {
    displayNoImagesFoundInfo();
  }
}

function isFractionOfImagesAnalysedByML() {
  const images = getAllImageData();
  let imagesAnalysedByML = false;
  let imagesNotYetAnalysedByML = false;
  for (let i = 0; i < images.length; i += 1) {
    if (images[i].analysedByML) {
      imagesAnalysedByML = true;
    } else {
      imagesNotYetAnalysedByML = true;
    }
    if (imagesAnalysedByML && imagesNotYetAnalysedByML) {
      return true;
    }
  }
  return false;
}

function cancelMachineLearning() {
  isCancelled = true;
  isInProgress = false;
}

function getProgressStatus() {
  return isInProgress;
}

export {
  startMachineLearning, cancelMachineLearning,
  getProgressStatus, isFractionOfImagesAnalysedByML,
};
