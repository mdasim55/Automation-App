declare module '*.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lr-config': any
      'lr-file-uploader-regular': any
      'lr-upload-ctx-provider': any
    }
  }
}

export {}


