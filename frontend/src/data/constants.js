/**
 * Experimental data for the three evaluated CNN architectures.
 * These are ACTUAL results from the B.Tech project notebooks — not fabricated.
 */

export const MODELS = [
  {
    id: 'mobilenetv2',
    name: 'MobileNetV2',
    accuracy: 83.60,
    macroF1: 0.8495,
    parameters: 2_263_108,
    parametersFormatted: '2.26M',
    modelSizeMB: 8.63,
    inferenceTimeMs: 15.64,
    highlight: true,
    description:
      'A lightweight, efficient architecture designed for mobile and edge deployment. Uses depthwise separable convolutions to reduce computational cost.',
  },
  {
    id: 'efficientnetb0',
    name: 'EfficientNetB0',
    accuracy: 81.29,
    macroF1: 0.8301,
    parameters: 4_054_695,
    parametersFormatted: '4.05M',
    modelSizeMB: 15.47,
    inferenceTimeMs: 19.76,
    highlight: false,
    description:
      'Uses compound scaling to balance network depth, width, and resolution for improved efficiency.',
  },
  {
    id: 'resnet50',
    name: 'ResNet50',
    accuracy: 79.07,
    macroF1: 0.7906,
    parameters: 23_595_908,
    parametersFormatted: '23.60M',
    modelSizeMB: 90.01,
    inferenceTimeMs: 45.55,
    highlight: false,
    description:
      'A deep residual network with skip connections. Larger and more computationally intensive but widely used as a benchmark architecture.',
  },
];

export const CLASSES = [
  {
    name: 'Broken',
    color: '#C4785B',
    colorLight: '#F6E8E1',
    description: 'Rice grains that are fractured or fragmented, significantly reduced in size compared to whole grains.',
    icon: '◇',
  },
  {
    name: 'Chalky',
    color: '#A8A0D2',
    colorLight: '#EEEDF6',
    description: 'Grains with opaque white areas caused by loosely packed starch granules, affecting texture and cooking quality.',
    icon: '○',
  },
  {
    name: 'Stained',
    color: '#D4985A',
    colorLight: '#F8EDE0',
    description: 'Grains showing discoloration from fungal infection, weathering, or improper storage conditions.',
    icon: '◆',
  },
  {
    name: 'Whole',
    color: '#5EA86B',
    colorLight: '#E3F1E5',
    description: 'Intact, undamaged rice grains meeting quality standards — the desired classification for premium rice.',
    icon: '●',
  },
];

export const DATASET = {
  training: 4616,
  validation: 988,
  testing: 994,
  total: 6598,
  classes: 4,
  imageSize: '224 × 224 × 3',
  batchSize: 16,
};

export const CLASS_WEIGHTS = {
  Broken: 1.904,
  Chalky: 1.083,
  Stained: 1.927,
  Whole: 0.492,
};

export const AUGMENTATION = [
  'Random Horizontal Flip',
  'Random Rotation',
  'Random Zoom',
  'Random Translation',
];

export const CLASS_DESCRIPTIONS = {
  Broken: 'The model classified the submitted image as a broken rice grain. Broken grains are fractured or fragmented pieces that are significantly smaller than whole grains.',
  Chalky: 'The model classified the submitted image as a chalky rice grain. Chalky grains have opaque white areas caused by loosely packed starch granules.',
  Stained: 'The model classified the submitted image as a stained rice grain. Stained grains show discoloration that may result from fungal infection, weathering, or storage conditions.',
  Whole: 'The model classified the submitted image as a whole rice grain. Whole grains are intact and undamaged, meeting quality standards for premium rice.',
};
