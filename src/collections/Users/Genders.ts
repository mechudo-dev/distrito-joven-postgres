import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { superadmin } from '../../access/superadmin'

const Genders: CollectionConfig = {
  slug: 'genders',
  labels: {
    singular: 'Sexo',
    plural: 'Sexos'
  },
  access: {
    create: superadmin,
    delete: superadmin,
    read: anyone,
    update: superadmin,
  },
  admin: {
    useAsTitle: 'gender',
    group: 'Usuarios'
  },
  fields: [
    {
      name: 'gender',
      type: 'text',
      label: 'Sexo',
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

export default Genders
