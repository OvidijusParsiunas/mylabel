import { constructCanvas } from './canvas/canvas';
import initialiseShapeLabellerModal from './tools/shapeLabellerModal/buttons';
import { initialiseUploadDatasetsModal } from './tools/uploadDatasetsModal/views/viewManager';
import { initialiseMachineLearningModal } from './tools/machineLearningModal/views/viewManager';
import initialiseExportLabelsPopUp from './tools/exportDatasetsPopup/buttonClickEvents';
import { initialiseSettingsPopup } from './tools/settingsPopup/buttonClickEvents';
import assignToolkitButtonClickEvents from './tools/toolkit/buttonClickEvents/buttonClickEvents';
import { assignToolkitButtonHoverEvents } from './tools/toolkit/buttonHoverEvents/buttonHoverEvents';
import assignPassiveEventListeners from './tools/passiveEventListeners/passiveEventListeners';
import initialiseShapeManipulationDeltas from './canvas/objects/deltaValueSetters/initialiseShapeManipulationDeltas';
import { initialiseGlobalStyleSetup } from './tools/globalStyling/style';
import { initialiseLabelListFunctionality } from './tools/labelList/labelList';
import { initialiseImageListFunctionality } from './tools/imageList/imageList';
import { initialiseRemoveImagesFunctionality } from './tools/imageList/removeImages/removeImages';
import { initialiseImageSwitchPanelFunctionality } from './tools/imageSwitchPanel/style';
import registerGlobalKeyEventHandlers from './keyEventHandlers/keyEventHandlers';

constructCanvas();
initialiseSettingsPopup();
initialiseShapeLabellerModal();
initialiseUploadDatasetsModal();
initialiseMachineLearningModal();
initialiseExportLabelsPopUp();
assignToolkitButtonClickEvents();
assignToolkitButtonHoverEvents();
assignPassiveEventListeners();
initialiseGlobalStyleSetup();
initialiseLabelListFunctionality();
initialiseImageListFunctionality();
initialiseRemoveImagesFunctionality();
initialiseImageSwitchPanelFunctionality();
registerGlobalKeyEventHandlers();
initialiseShapeManipulationDeltas();
