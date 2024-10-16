import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { superadmin } from '../../access/superadmin'

const DocumentTypes: CollectionConfig = {
  slug: 'documentTypes',
  labels: {
    singular: 'Tipo de Documento',
    plural: 'Tipos de Documento'
  },
  access: {
    create: superadmin,
    delete: superadmin,
    read: anyone,
    update: superadmin,
  },
  admin: {
    useAsTitle: 'documentType',
    group: 'Usuarios'
  },
  fields: [
    {
      name: 'documentType',
      type: 'text',
      label: 'Tipo de Documento',
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

export default DocumentTypes
