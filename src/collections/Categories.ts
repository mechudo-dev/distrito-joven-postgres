import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Categoría',
    plural: 'Categorías'
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isVisible'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}

export default Categories
