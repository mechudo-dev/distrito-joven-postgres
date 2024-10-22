import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidatePost } from './hooks/revalidatePost'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'

export const OperationUnits: CollectionConfig = {
  slug: 'operationUnits',
  labels: {
    singular: 'Unidad Operativa',
    plural: 'Unidades Operativas'
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultSort: 'title',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'service', 'locality', 'neighborhood', 'address', 'updatedAt', 'isVisible'],
    listSearchableFields: ['title'],
    description: 'Listado de todas las Unidades Operativas de la Subdirección para la Juventud.',
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: `/${typeof data?.slug === 'string' ? data.slug : ''}`,
          collection: 'operationUnits',
        })

        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: `/${typeof data?.slug === 'string' ? data.slug : ''}`,
        collection: 'operationUnits',
      })

      return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Nombre',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      type: 'relationship',
      relationTo: 'services',
      name: 'service',
      label: 'Servicio',
      hasMany: false,
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
        {
          label: 'Ubicación',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'relationship',
                  relationTo: 'localities',
                  name: 'Localidad',
                  hasMany: false,
                  required: true,
                },
                {
                  type: 'text',
                  name: 'neighborhood',
                  label: 'Barrio',
                  required: true,
                },
              ]
            },
            {
              type: 'text',
              name: 'address',
              label: 'Dirección',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'number',
                  name: 'latitude',
                  label: 'Latitud',
                  required: true,
                },
                {
                  type: 'number',
                  name: 'longitude',
                  label: 'Longitud',
                  required: true,
                },
              ]
            },
          ]
        },
        {
          label: 'Contenido',
          fields: [
            {
              name: 'pageContent',
              label: 'Contenido de Página',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              required: true,
            },
          ],
        },
        {
          label: 'Talleres',
          fields: [
            {
              type: 'array',
              name: 'workshops',
              label: 'Talleres',
              fields: [
                {
                  type: 'checkbox',
                  name: 'isHightlight',
                  label: '¿Destacar?',
                  required: true,
                  defaultValue: false,
                },
                {
                  type: 'text',
                  name: 'name',
                  label: 'Nombre',
                  required: true
                },
                {
                  type: 'textarea',
                  name: 'description',
                  label: 'Descripción',
                },
                {
                  type: 'array',
                  name: 'schedules',
                  label: 'Horarios',
                  fields: [
                    {
                      type: 'select',
                      name: 'day',
                      label: 'Día',
                      required: true,
                      options: [
                        {
                          label: 'Lunes',
                          value: 'Lunes'
                        },
                        {
                          label: 'Martes',
                          value: 'Martes'
                        },
                        {
                          label: 'Miercoles',
                          value: 'Miercoles'
                        },
                        {
                          label: 'Jueves',
                          value: 'Jueves'
                        },
                        {
                          label: 'Viernes',
                          value: 'Viernes'
                        },
                        {
                          label: 'Sabado',
                          value: 'Sabado'
                        },
                        {
                          label: 'Domingo',
                          value: 'Domingo'
                        },
                      ]
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          type: 'date',
                          name: 'startTime',
                          label: 'Hora de Inicio',
                          required: true,
                          admin: {
                            date: {
                              pickerAppearance: 'timeOnly',
                              displayFormat: 'h:mm a',
                              timeIntervals: 15
                            },
                          },
                        },
                        {
                          type: 'date',
                          name: 'endTime',
                          label: 'Hora de Finalización',
                          required: true,
                          admin: {
                            date: {
                              pickerAppearance: 'timeOnly',
                              displayFormat: 'h:mm a',
                              timeIntervals: 15
                            },
                          },
                        }
                      ]
                    },
                  ]
                },
              ]
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    ...slugField(),
    {
      name: 'isVisible',
      label: '¿Es visible?',
      type: 'checkbox',
      defaultValue: true,
      required: true,
      admin: {
        position: 'sidebar'
      }
    },
  ],
  hooks: {
    afterChange: [revalidatePost],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}
