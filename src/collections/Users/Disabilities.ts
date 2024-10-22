import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { superadmin } from '../../access/superadmin'

const Disabilities: CollectionConfig = {
  slug: 'disabilities',
  labels: {
    singular: 'Discapacidad',
    plural: 'Discapacidades'
  },
  access: {
    create: superadmin,
    delete: superadmin,
    read: anyone,
    update: superadmin,
  },
  admin: {
    useAsTitle: 'disability',
    group: 'Usuarios'
  },
  fields: [
    {
      name: 'disability',
      type: 'text',
      label: 'Discapacidad',
      required: true,
      unique: true,
    },
    {
      name: 'isVisible',
      label: '¿Es visible?',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      admin: {
        position: 'sidebar'
      }
    },
  ],
}

export default Disabilities
