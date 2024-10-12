import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'
import Logo from '../Logo/Logo'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <div className='logo_container'>
        <div className='logo'>
          <Logo />
        </div>
      </div>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>¡Bienvenido al Dashboard de Distrito Joven!</h4>
      </Banner>
      Desde este panel de administración, podrás gestionar la información del sitio fácilmente.
    </div>
  )
}

export default BeforeDashboard
