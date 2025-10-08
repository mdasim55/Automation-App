'use client'
import React, { useEffect, useRef } from 'react'
import * as LR from '@uploadcare/blocks'
import { useRouter } from 'next/navigation'

type Props = {
  onUpload: (e: string) => any
}

;(LR as any).registerBlocks?.(LR)

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter()
  const ctxProviderRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl)
      if (file) {
        router.refresh()
      }
    }
    ctxProviderRef.current?.addEventListener('file-upload-success', handleUpload as EventListener)
    return () => ctxProviderRef.current?.removeEventListener('file-upload-success', handleUpload as EventListener)
  }, [])

  const LrConfig = 'lr-config' as any
  const LrFileUploaderRegular = 'lr-file-uploader-regular' as any
  const LrUploadCtxProvider = 'lr-upload-ctx-provider' as any

  return (
    <div>
      <LrConfig ctx-name="my-uploader" pubkey="a9428ff5ff90ae7a64eb" />

      <LrFileUploaderRegular
        ctx-name="my-uploader"
        css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css`}
      />

      <LrUploadCtxProvider ctx-name="my-uploader" ref={ctxProviderRef} />
    </div>
  )
}

export default UploadCareButton