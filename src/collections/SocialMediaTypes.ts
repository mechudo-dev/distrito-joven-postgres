import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { superadmin } from '../access/superadmin'

const SocialMediaTypes: CollectionConfig = {
  slug: 'socialMediaTypes',
  labels: {
    singular: 'Tipo de Red Social',
    plural: 'Tipos de Redes Sociales',
  },
  access: {
    create: superadmin,
    delete: superadmin,
    read: anyone,
    update: superadmin,
  },
  admin: {
    useAsTitle: 'socialMediaType',
    group: 'Constantes',
  },
  fields: [
    {
      type: 'text',
      name: 'socialMediaType',
      label: 'Tipo Red Social',
      required: true,
      unique: true,
    },
    {
      name: 'isVisible',
      label: '¿Es visible?',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar'
      }
    },
  ],
}

export default SocialMediaTypes
