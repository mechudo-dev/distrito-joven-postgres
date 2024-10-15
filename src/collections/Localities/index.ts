import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { FieldHook } from 'payload';

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
    defaultColumns: ['name', 'code'],
    useAsTitle: 'name',
    description: '',
    listSearchableFields: ['name', 'code'],
  },
  fields: [
    {
      name: 'code',
      label: 'Código',
      type: 'number',
      min: 1,
      unique: true,
    },
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
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
  timestamps: true,
}

export default Localities
