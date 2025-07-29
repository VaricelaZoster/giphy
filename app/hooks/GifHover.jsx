import { usePathname } from 'next/navigation'
import React from 'react'

export const GifHover = () => {
  const url = usePathname()
  const isGifPage = url.includes('/gif')

  return [isGifPage]
}
