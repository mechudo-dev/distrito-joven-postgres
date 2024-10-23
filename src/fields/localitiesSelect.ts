import deepMerge from '@/utilities/deepMerge'
import type { ArrayField, Field } from 'payload'

type LocalitiesSelectType = (options?: {
  overrides?: Partial<ArrayField>
}) => Field

export const localitiesSelect: LocalitiesSelectType = ({ overrides = {} } = {}) => {
  const localities: Field = {
    type: 'select',
    name: 'locality',
    label: 'Localidad',
    required: true,
    hasMany: false,
    options: [
      {
        label: '1 - Usaquén',
        value: 'Usaquén'
      },
      {
        label: '2 - Chapinero',
        value: 'Chapinero'
      },
      {
        label: '3 - Santa Fe',
        value: 'Santa Fe'
      },
      {
        label: '4 - San Cristóbal',
        value: 'San Cristóbal'
      },
      {
        label: '5 - Usme',
        value: 'Usme'
      },
      {
        label: '6 - Tunjuelito',
        value: 'Tunjuelito'
      },
      {
        label: '7 - Bosa',
        value: 'Bosa'
      },
      {
        label: '8 - Kennedy',
        value: 'Kennedy'
      },
      {
        label: '9 - Fontibón',
        value: 'Fontibón'
      },
      {
        label: '10 - Engativá',
        value: 'Engativá'
      },
      {
        label: '11 - Suba',
        value: 'Suba'
      },
      {
        label: '12 - Barrios Unidos',
        value: 'Barrios Unidos'
      },
      {
        label: '13 - Teusaquillo',
        value: 'Teusaquillo'
      },
      {
        label: '14 - Los Mártires',
        value: 'Los Mártires'
      },
      {
        label: '15 - Antonio Nariño',
        value: 'Antonio Nariño'
      },
      {
        label: '16 - Puente Aranda',
        value: 'Puente Aranda'
      },
      {
        label: '17 - La Candelaria',
        value: 'La Candelaria'
      },
      {
        label: '18 - Rafael Uribe Uribe',
        value: 'Rafael Uribe Uribe'
      },
      {
        label: '19 - Ciudad Bolívar',
        value: 'Ciudad Bolívar'
      },
      {
        label: '20 - Sumapaz',
        value: 'Sumapaz'
      },
    ],
  }

  return deepMerge(localities, overrides)
}
