import type { Metadata } from 'next'

import { PageRange } from '@/components/PageRange'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Service } from '@/payload-types'

import { ServiceHero } from '@/heros/ServiceHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  const params = services.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
    operationUnitsPageNumber: number
  }>
}

export default async function Service({ params: paramsPromise }: Args) {
  const { slug = '', operationUnitsPageNumber = 2 } = await paramsPromise
  const url = '/servicios/' + slug
  const service = await queryServiceBySlug({ slug })
  const payload = await getPayloadHMR({ config: configPromise })

  if (!service) return <PayloadRedirects url={url} />

  const operationUnits = await payload.find({
    collection: 'operationUnits',
    depth: 1,
    limit: 6,
    where: {
      'service.title': {
        equals: service.title
      }
    },
    page: operationUnitsPageNumber
  })

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <ServiceHero service={service} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container lg:mx-0 lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          <RichText
            className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
            content={service.pageContent}
            enableGutter={false}
          />
        </div>

      </div>

      <div className="container mb-8">
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
      </div>

      <CollectionArchive prefix={`servicios/${service.slug}/unidades-operativas`} items={operationUnits.docs} showCardCategories={true} />

      <div className="container">
        {operationUnits.totalPages > 1 && operationUnits.page && (
          <Pagination pageName={`servicios/${service.slug}`} page={Number(operationUnits.page)} totalPages={operationUnits.totalPages} />
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const service = await queryServiceBySlug({ slug })

  return generateMeta({ doc: service })
}

const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
