import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { superadmin } from '@/access/superadmin'
import { FieldHook } from 'payload';
import { localitiesSelect } from '@/fields/localitiesSelect';

const populateFullName: FieldHook = async ({ data }) => (
  `${data?.firstName ? data?.firstName : ''} ${data?.otherNames ? data?.otherNames : ''} ${data?.firstLastName ? data?.firstLastName : ''} ${data?.secondLastName ? data?.secondLastName : ''}`
);

const calculateAge: FieldHook = async ({ data }) => {
  const today = new Date();
  const birthDate = new Date(data?.dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Si aún no ha pasado el mes del cumpleaños o es el mismo mes pero el día no ha pasado
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age + ' años';
};

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
    defaultColumns: ['documentNumber', 'fullName', 'age', 'email', 'locality', 'role', 'isVisible'],
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
                  type: 'select',
                  name: 'documentType',
                  label: 'Tipo de Documento',
                  required: true,
                  options: [
                    {
                      label: 'Tarjeta de Identidad',
                      value: 'Tarjeta de Identidad'
                    },
                    {
                      label: 'Cédula de Ciudadanía',
                      value: 'Cédula de Ciudadanía'
                    },
                    {
                      label: 'Cédula de Extranjería',
                      value: 'Cédula de Extranjería'
                    },
                    {
                      label: 'Permiso Especial de Permanencia',
                      value: 'Permiso Especial de Permanencia	'
                    },
                  ],
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
              virtual: true,
              type: 'text',
              name: 'age',
              label: 'Edad',
              access: {
                create: () => false,
                update: () => false,
              },
              hooks: {
                beforeChange: [({ siblingData }) => {
                  delete siblingData['age'] // ensures data is not stored in DB
                }],
                afterRead: [
                  calculateAge,
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
                  type: 'select',
                  name: 'sexualOrientation',
                  label: 'Orientación Sexual',
                  required: true,
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
                      value: 'Bisexual'
                    },
                    {
                      label: 'Otra',
                      value: 'Otra'
                    },
                    {
                      label: 'Prefiero no responder',
                      value: 'Prefiero no responder'
                    },
                  ],
                },
                {
                  type: 'select',
                  name: 'gender',
                  label: 'Sexo',
                  required: true,
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
                      value: 'Intersexual'
                    },
                    {
                      label: 'Prefiero no responder',
                      value: 'Prefiero no responder'
                    },
                  ],
                },
              ]
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'select',
                  name: 'ethnicity',
                  label: 'Etnia',
                  required: true,
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
                      value: 'Pueblo y/o comunidad indígena'
                    },
                    {
                      label: 'Comunidades negras',
                      value: 'Comunidades negras'
                    },
                    {
                      label: 'Población afrodescendiente',
                      value: 'Población afrodescendiente'
                    },
                    {
                      label: 'Comunidades palenqueras',
                      value: 'Comunidades palenqueras'
                    },
                    {
                      label: 'Pueblo raizal',
                      value: 'Pueblo raizal'
                    },
                  ],
                },
                {
                  type: 'select',
                  name: 'disability',
                  label: 'Discapacidad',
                  required: true,
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
                      value: 'Auditiva'
                    },
                    {
                      label: 'Cognitiva',
                      value: 'Cognitiva'
                    },
                    {
                      label: 'Física',
                      value: 'Física'
                    },
                    {
                      label: 'Psicosocial',
                      value: 'Psicosocial'
                    },
                    {
                      label: 'Sordoceguera',
                      value: 'Sordoceguera'
                    },
                    {
                      label: 'Múltiple',
                      value: 'Múltiple'
                    },
                    {
                      label: 'Otra',
                      value: 'Otra'
                    },
                  ],
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
                      type: 'select',
                      name: 'socialMediaType',
                      label: 'Red Social',
                      required: true,
                      options: [
                        {
                          label: 'Página Web',
                          value: 'Página Web'
                        },
                        {
                          label: 'TikTok',
                          value: 'TikTok'
                        },
                        {
                          label: 'Facebook',
                          value: 'Facebook'
                        },
                        {
                          label: 'Instagram',
                          value: 'Instagram'
                        },
                        {
                          label: 'X',
                          value: 'X'
                        },
                        {
                          label: 'LinkedIn',
                          value: 'LinkedIn'
                        },
                        {
                          label: 'Pinterest',
                          value: 'Pinterest'
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
          label: 'Ubicación de Residencia',
          fields: [
            localitiesSelect(),
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
