import type { Metadata } from 'next'

import { PageRange } from '@/components/PageRange'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Service } from '@/payload-types'

import { OperationUnitHero } from '@/heros/OperationUnitHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'
import GoogleMap from '@/components/GoogleMap'

// export async function generateStaticParams() {
//   const payload = await getPayloadHMR({ config: configPromise })
//   const services = await payload.find({
//     collection: 'services',
//     draft: false,
//     limit: 1000,
//     overrideAccess: false,
//   })

//   const params = services.docs.map(({ slug }) => {
//     return { slug }
//   })

//   return params
// }

type Args = {
  params: Promise<{
    unidadOperativa?: string
  }>
}

export default async function OperationUnit({ params: paramsPromise }: Args) {
  const { unidadOperativa = '' } = await paramsPromise
  // const url = '/servicios/' + slug
  const operationUnit = await queryOperationUnitBySlug({ unidadOperativa })

  // if (!service) return <PayloadRedirects url={'/n'} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      {/* <PayloadRedirects disableNotFound url={url} /> */}

      <OperationUnitHero operationUnit={operationUnit} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container lg:mx-0 lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          <RichText
            className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
            content={operationUnit.pageContent}
            enableGutter={false}
          />
        </div>

      </div>

      <div className="flex flex-col items-center gap-4 pt-8">
        <GoogleMap coordinates={
          [{
            longitude: operationUnit.longitude,
            latitude: operationUnit.latitude
          }]
        } />
      </div>

      {/* <div className="container mb-8">
        <PageRange
          collection="operationUnits"
          currentPage={operationUnits.page}
          limit={6}
          totalDocs={operationUnits.totalDocs}
          collectionLabels={{
            singular: service.title,
            plural: service.title,
          }}
        />
      </div> */}

      {/* <CollectionArchive prefix={``} items={operationUnit.workshops} showCardCategories={true} /> */}

      {/* <div className="container">
        {operationUnits.totalPages > 1 && operationUnits.page && (
          <Pagination pageName='operationUnits' page={operationUnits.page} totalPages={operationUnits.totalPages} />
        )}
      </div> */}

      <h2 className='my-2 mx-20'>Talleres</h2>

      {operationUnit.workshops?.map(workshop => (
        <p key={workshop.id}>{workshop.name}</p>
      ))}

    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { unidadOperativa = '' } = await paramsPromise
  const operationUnit = await queryOperationUnitBySlug({ unidadOperativa })

  return generateMeta({ doc: operationUnit })
}

const queryOperationUnitBySlug = cache(async ({ unidadOperativa }: { unidadOperativa: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'operationUnits',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: unidadOperativa,
      },
    },
  })

  return result.docs?.[0] || null
})
