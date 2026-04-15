'use client'

import { useMemo } from 'react'

interface PDFViewerProps {
  pdfUrl: string
  lessonTitle: string
  page?: number
}

export function PDFViewer({ pdfUrl, lessonTitle, page = 1 }: PDFViewerProps) {
  const handleError = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const target = e.currentTarget
    target.style.display = 'none'
  }

  // Configure PDF.js viewer to show single page mode
  const configuredPdfUrl = useMemo(() => {
    // Check if pdfUrl already has hash parameters
    if (pdfUrl.includes('#')) {
      return pdfUrl
    }

    // Add hash parameters for single page mode
    const params = `page=${page}&pagemode=none&scrollbar=0&toolbar=0&navpanes=0&view=FitH`
    return `${pdfUrl}#${params}`
  }, [pdfUrl, page])

  return (
    <div className="border rounded-lg overflow-hidden bg-gray-50">
      <iframe
        src={configuredPdfUrl}
        title={`PDF: ${lessonTitle}`}
        className="w-full"
        style={{ height: '841px' }}
        loading="lazy"
        onError={handleError}
      />
    </div>
  )
}
