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
  },
  auth: true,
  fields: [
    {
      name: 'role',
      label: 'Rol',
      type: 'select',
      required: true,
      defaultValue: 'user',
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
      type: 'collapsible',
      label: 'Información Personal',
      admin: {
        initCollapsed: true
      },
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
        // virtual field (not storaged at DB)
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
              name: 'documentType',
              label: 'Tipo de Documento',
              type: 'select',
              defaultValue: 'Tarjeta de Identidad',
              required: true,
              options: [
                {
                  label: 'Tarjeta de Identidad',
                  value: 'Tarjeta de Identidad'
                },
                {
                  label: 'Cédula de ciudadanía',
                  value: 'Cédula de ciudadanía'
                },
                {
                  label: 'Cédula de extranjería',
                  value: 'Cédula de extranjería',
                },
                {
                  label: 'Cédula de extranjería',
                  value: 'Permiso especial de permanencia',
                }
              ],
            },
            {
              name: 'docNumber',
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
        },
        {
          name: 'gender',
          label: 'Sexo',
          type: 'select',
          options: [
            {
              label: 'Mujer',
              value: 'Mujer'
            },
            {
              label: 'Hombre',
              value: 'Hombre'
            },
            {
              label: 'Intersexual',
              value: 'Intersexual',
            },
            {
              label: 'Prefiero no responder',
              value: 'Prefiero no responder',
            }
          ],
        },
        {
          name: 'sexualOrientation',
          label: 'Orientación Sexual',
          type: 'select',
          options: [
            {
              label: 'Heterosexual',
              value: 'Heterosexual'
            },
            {
              label: 'Homosexual',
              value: 'Homosexual'
            },
            {
              label: 'Bisexual',
              value: 'Bisexual',
            },
            {
              label: 'Otra',
              value: 'Otra',
            },
            {
              label: 'Prefiero no responder',
              value: 'Prefiero no responder',
            },
          ],
        },
        {
          name: 'disability',
          label: 'Discapacidad',
          type: 'select',
          defaultValue: 'Ninguna',
          options: [
            {
              label: 'Ninguna',
              value: 'Ninguna'
            },
            {
              label: 'Visual',
              value: 'Visual'
            },
            {
              label: 'Auditiva',
              value: 'Auditiva',
            },
            {
              label: 'Cognitiva',
              value: 'Cognitiva',
            },
            {
              label: 'Física',
              value: 'Física',
            },
            {
              label: 'Psicosocial',
              value: 'Psicosocial',
            },
            {
              label: 'Sordoceguera',
              value: 'Sordoceguera',
            },
            {
              label: 'Múltiple',
              value: 'Múltiple',
            },
            {
              label: 'Otra',
              value: 'Otra',
            },
          ],
        },
        {
          name: 'ethnicity',
          label: 'Etnia ',
          type: 'select',
          defaultValue: 'Ninguna',
          options: [
            {
              label: 'Ninguna',
              value: 'Ninguna'
            },
            {
              label: 'Pueblo Rrom – Gitano',
              value: 'Pueblo Rrom – Gitano'
            },
            {
              label: 'Pueblo y/o comunidad indígena',
              value: 'Pueblo y/o comunidad indígena',
            },
            {
              label: 'Comunidades negras',
              value: 'Comunidades negras',
            },
            {
              label: 'Población afrodescendiente',
              value: 'Población afrodescendiente',
            },
            {
              label: 'Comunidades palenqueras',
              value: 'Comunidades palenqueras',
            },
            {
              label: 'Pueblo raizal',
              value: 'Pueblo raizal',
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Contacto',
      admin: {
        initCollapsed: true
      },
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
                  type: 'select',
                  name: 'type',
                  label: 'Red Social',
                  options: [
                    {
                      label: 'Tiktok',
                      value: 'Tiktok'
                    },
                    {
                      label: 'Facebook',
                      value: 'Facebook'
                    },
                    {
                      label: 'Instagram',
                      value: 'Instagram',
                    },
                    {
                      label: 'X',
                      value: 'X',
                    },
                    {
                      label: 'LinkedIn',
                      value: 'LinkedIn',
                    },
                    {
                      label: 'Pinterest',
                      value: 'Pinterest',
                    },
                    {
                      label: 'Página Web',
                      value: 'Página Web',
                    },
                  ],
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
      type: 'collapsible',
      label: 'Ubicación de Residencia',
      admin: {
        initCollapsed: true
      },
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
      name: 'description',
      label: 'Descripción de Perfíl',
      type: 'textarea',
    },
    {
      name: 'media',
      label: 'Foto de Perfíl',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'receiveEmails',
      label: '¿Recibe emails?',
      type: 'checkbox',
      defaultValue: true,
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
