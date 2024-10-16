import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { superadmin } from '@/access/superadmin'
import { FieldHook } from 'payload';

const populateFullName: FieldHook = async ({ data }) => (
  `${data?.firstName ? data?.firstName : ''} ${data?.otherNames ? data?.otherNames : ''} ${data?.firstLastName ? data?.firstLastName : ''} ${data?.secondLastName ? data?.secondLastName : ''}`
);

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Usuario',
    plural: 'Usuarios'
  },
  defaultSort: 'fullName',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['documentNumber', 'fullName', 'role', 'isVisible'],
    useAsTitle: 'fullName',
    description: '',
    listSearchableFields: ['documentNumber', 'fullName', 'role'],
    group: 'Usuarios'
  },
  auth: true,
  fields: [
    {
      name: 'role',
      label: 'Rol',
      type: 'select',
      required: true,
      defaultValue: 'user',
      admin: {
        position: 'sidebar'
      },
      options: [
        {
          label: 'Usuario',
          value: 'user'
        },
        {
          label: 'Administrador',
          value: 'admin'
        },
        {
          label: 'Super Administrador',
          value: 'superadmin',
        }
      ],
      access: {
        create: superadmin,
        update: superadmin,
      }
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Información Personal',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'firstName',
                  label: 'Primer Nombre',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'otherNames',
                  label: 'Otros Nombres',
                  type: 'text',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'firstLastName',
                  label: 'Primer Apellido',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'secondLastName',
                  label: 'Segundo Apellido',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'fullName',
              label: 'Nombre Completo',
              type: 'text',
              virtual: true,
              access: {
                create: () => false,
                update: () => false,
              },
              hooks: {
                beforeChange: [({ siblingData }) => {
                  // Mutate the sibling data to prevent DB storage
                  // eslint-disable-next-line no-param-reassign
                  delete siblingData['fullName'] // ensures data is not stored in DB
                }],
                afterRead: [
                  populateFullName,
                ],
              },
              admin: {
                hidden: true,
              },
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'relationship',
                  relationTo: 'documentTypes',
                  name: 'documentType',
                  label: 'Tipo de Documento',
                  hasMany: false,
                  required: true,
                },
                {
                  name: 'documentNumber',
                  label: 'Número de Documento',
                  type: 'number',
                  required: true,
                  min: 0
                },
              ],
            },
            {
              name: 'dateOfBirth',
              label: 'Fecha de Nacimiento',
              type: 'date',
              admin: {
                date: {
                  maxDate: new Date()
                }
              }
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'relationship',
                  relationTo: 'sexualOrientations',
                  name: 'sexualOrientation',
                  label: 'Orientación Sexual',
                  hasMany: false,
                },
                {
                  type: 'relationship',
                  relationTo: 'genders',
                  name: 'gender',
                  label: 'Sexo',
                  hasMany: false,
                },
              ]
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'relationship',
                  relationTo: 'ethnicities',
                  name: 'ethnicity',
                  label: 'Etnia',
                  defaultValue: 'Ninguna',
                  hasMany: false,
                },
                {
                  type: 'relationship',
                  relationTo: 'disabilities',
                  name: 'disability',
                  label: 'Discapacidad',
                  defaultValue: 'Ninguna',
                  hasMany: true
                },
              ]
            },
          ],
        },
        {
          label: 'Contacto',
          fields: [
            {
              type: 'number',
              name: 'phoneNumber',
              label: 'Número de Telefono',
              min: 0,
            },
            {
              type: 'array',
              name: 'socialMedia',
              label: 'Redes Sociales',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'relationship',
                      name: 'socialMediaType',
                      label: 'Red Social',
                      relationTo: 'socialMediaTypes',
                      hasMany: false
                    },
                    {
                      type: 'text',
                      name: 'socialMediaURL',
                      label: 'URL'
                    }
                  ]
                },
              ]
            }
          ],
        },
        {
          label: 'Ubicación de Residencia',
          fields: [
            {
              type: 'relationship',
              relationTo: 'localities',
              name: 'locality',
              label: 'Localidad',
              hasMany: false,
            },
            {
              type: 'text',
              name: 'neighborhood',
              label: 'Barrio',
            },
            {
              type: 'text',
              name: 'address',
              label: 'Dirección',
            }
          ]
        },
        {
          label: 'Más',
          fields: [
            {
              name: 'description',
              label: 'Descripción de Perfíl',
              type: 'textarea',
            },
            {
              name: 'receiveEmails',
              label: '¿Recibe emails?',
              type: 'checkbox',
              defaultValue: true,
            },
          ]
        }
      ]
    },
    {
      name: 'media',
      label: 'Foto de Perfil',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar'
      }
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

export default Users
