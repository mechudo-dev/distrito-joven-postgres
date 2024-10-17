import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { superadmin } from '../../access/superadmin'

const Ethnicities: CollectionConfig = {
  slug: 'ethnicities',
  labels: {
    singular: 'Etnia',
    plural: 'Etnias'
  },
  access: {
    create: superadmin,
    delete: superadmin,
    read: anyone,
    update: superadmin,
  },
  admin: {
    useAsTitle: 'ethnicity',
    group: 'Usuarios'
  },
  fields: [
    {
      name: 'ethnicity',
      type: 'text',
      label: 'Etnia',
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

export default Ethnicities
