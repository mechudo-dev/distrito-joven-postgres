import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

const Localities: CollectionConfig = {
  slug: 'localities',
  labels: {
    singular: 'Localidad',
    plural: 'Localidades'
  },
  defaultSort: 'code',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'code' , 'isVisible'],
    useAsTitle: 'name',
    description: '',
    listSearchableFields: ['name', 'code'],
    group: 'Constantes',
  },
  fields: [
    {
      name: 'code',
      label: 'Código',
      type: 'number',
      min: 1,
      unique: true,
      required: true,
    },
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      unique: true,
      required: true,
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
  timestamps: true,
}

export default Localities