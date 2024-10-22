import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { superadmin } from '../../access/superadmin'

const SexualOrientations: CollectionConfig = {
  slug: 'sexualOrientations',
  labels: {
    singular: 'Orientación Sexual',
    plural: 'Orientaciones Sexuales'
  },
  access: {
    create: superadmin,
    delete: superadmin,
    read: anyone,
    update: superadmin,
  },
  admin: {
    useAsTitle: 'sexualOrientation',
    group: 'Usuarios',
  },
  fields: [
    {
      type: 'text',
      name: 'sexualOrientation',
      label: 'Orientación Sexual',
      required: true,
      unique: true,
    },
    {
      type: 'checkbox',
      name: 'isVisible',
      label: '¿Es visible?',
      required: true,
      defaultValue: true,
      admin: {
        position: 'sidebar'
      }
    },
  ],
}

export default SexualOrientations
