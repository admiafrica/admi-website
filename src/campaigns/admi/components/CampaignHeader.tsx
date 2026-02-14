import styles from '@/assets/css/main.module.css'
import logo from '@/assets/logo-main.svg'
import { getCourseFormUrl } from '@/utils'
import Image from 'next/image'
import React from 'react'
import { CampaignHeaderLayout } from '@/campaigns/components'

export default function CampaignHeader() {
  return (
    <CampaignHeaderLayout>
      <div style={headerContentStyle} className="flex flex-wrap">
        <Image src={logo} width={80} alt="Africa Digital Media Institute" />

        <>
          <a
            href={getCourseFormUrl()}
            className={`${styles['btn']} ${styles['btn-primary']} ${styles['btn-floating']} ${styles['pulse']}`}
            style={ctaBtnStyle}
          >
            Get a call back
          </a>
        </>
      </div>
    </CampaignHeaderLayout>
  )
}

const headerContentStyle: React.CSSProperties = {
  flex: 1,
  padding: '0 15px',
  display: 'flex',
  maxWidth: 1280,
  margin: 'auto'
}

const ctaBtnStyle: React.CSSProperties = {
  top: 14,
  width: 200,
  height: 54,
  padding: 8,
  fontSize: '1.2em'
}
