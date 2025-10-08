declare namespace JSX {
  interface IntrinsicElements {
    'lr-upload-ctx-provider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'ctx-name'?: string
    }
    'lr-file-uploader-regular': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'ctx-name'?: string
      'css-src'?: string
    }
    'lr-config': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'ctx-name'?: string
      pubkey?: string
    }
  }
}
