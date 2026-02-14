'use client'

import React from 'react'
import Image from 'next/image'

import { Paragraph } from '@/components/ui'

import IconFacebook from '@/assets/icons/facebook-social.svg'
import IconWhatsapp from '@/assets/icons/whatsapp-social.svg'
import IconCopyContent from '@/assets/icons/copy-content.svg'
import IconShare from '@/assets/icons/share.svg'
import IconLinkedIn from '@/assets/icons/linkedin-social.svg'
import useFullUrl from '@/hooks/useFullUrl'

type Props = {
  item: { title: string; summary: string }
}

export default function SocialShare({ item }: Props) {
  const urlToShare = useFullUrl()

  const handleShare = (platform: string) => {
    let shareUrl = ''

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlToShare)}`
        break
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${item.title} - ${item.summary} ${urlToShare}`)}`
        break
      default:
        return
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(urlToShare)
      alert('Link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="sticky top-[100px] flex flex-col sm:w-[200px]">
      <div className="flex pb-6">
        <Image src={IconShare} alt="share" width={32} height={32} />
        <Paragraph className="my-auto" fontFamily="font-nexa">
          Share on:
        </Paragraph>
      </div>
      <div className="flex w-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex cursor-pointer py-4" onClick={() => handleShare('facebook')}>
          <Image src={IconFacebook} alt="facebook" width={24} height={24} />
          <Paragraph fontFamily="font-nexa" size="16px" className="my-auto ml-2">
            Facebook
          </Paragraph>
        </div>
        <hr className="border-gray-200" />
        <div className="flex cursor-pointer py-4" onClick={() => handleShare('linkedin')}>
          <Image src={IconLinkedIn} alt="linkedin" width={24} height={24} />
          <Paragraph fontFamily="font-nexa" size="16px" className="my-auto ml-2">
            LinkedIn
          </Paragraph>
        </div>
        <hr className="border-gray-200" />
        <div className="flex cursor-pointer py-4" onClick={() => handleShare('whatsapp')}>
          <Image src={IconWhatsapp} alt="whatsapp" width={24} height={24} />
          <Paragraph fontFamily="font-nexa" size="16px" className="my-auto ml-2">
            WhatsApp
          </Paragraph>
        </div>
        <hr className="border-gray-200" />
        <div className="flex cursor-pointer py-4" onClick={handleCopyLink}>
          <Image src={IconCopyContent} alt="copy link" width={24} height={24} />
          <Paragraph fontFamily="font-nexa" size="16px" className="my-auto ml-2">
            Copy Link
          </Paragraph>
        </div>
      </div>
    </div>
  )
}
