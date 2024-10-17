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
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  defaultSort: 'documentNumber',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['documentNumber', 'fullName', 'email', 'locality', 'role', 'isVisible'],
    listSearchableFields: ['documentNumber', 'fullName', 'email'],
    description: 'Listado de todos los usuarios del sistema, incluyendo usuarios, administradores y demás usuarios con otros roles del sistema',
    // hideAPIURL: Boolean(!superadmin),
    group: 'Usuarios'
  },
  auth: true,
  fields: [
    {
      type: 'select',
      name: 'role',
      label: 'Rol',
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
                  type: 'text',
                  name: 'firstName',
                  label: 'Primer Nombre',
                  required: true,
                },
                {
                  type: 'text',
                  name: 'otherNames',
                  label: 'Otros Nombres',
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
              virtual: true,
              type: 'text',
              name: 'fullName',
              label: 'Nombre Completo',
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
                  type: 'number',
                  name: 'documentNumber',
                  label: 'Número de Documento',
                  required: true,
                  min: 0
                },
              ],
            },
            {
              type: 'date',
              name: 'dateOfBirth',
              label: 'Fecha de Nacimiento',
              required: true,
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
                  required: true,
                },
                {
                  type: 'relationship',
                  relationTo: 'genders',
                  name: 'gender',
                  label: 'Sexo',
                  hasMany: false,
                  required: true,
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
                  required: true,
                },
                {
                  type: 'relationship',
                  relationTo: 'disabilities',
                  name: 'disability',
                  label: 'Discapacidad',
                  defaultValue: 'Ninguna',
                  hasMany: true,
                  required: true,
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
              required: true,
            },
            {
              type: 'text',
              name: 'neighborhood',
              label: 'Barrio',
              required: true,
            },
            {
              type: 'text',
              name: 'address',
              label: 'Dirección',
              required: true,
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
              defaultValue: false,
              required: true,
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
      required: true,
      admin: {
        position: 'sidebar'
      },
    },
  ],
  timestamps: true,
}

export default Users
