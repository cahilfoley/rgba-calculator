import { useEffect } from 'react'
import { APP_TITLE } from '../config/constants'

export function useDocumentTitle(pageTitle: string, appTitle = APP_TITLE) {
  useEffect(() => {
    document.title = `${pageTitle} | ${appTitle}`

    return () => {
      document.title = appTitle
    }
  }, [pageTitle, appTitle])
}

export default useDocumentTitle
