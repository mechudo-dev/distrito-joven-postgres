import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page({ params: { pageNumber = 2 } }) {
  const payload = await getPayloadHMR({ config: configPromise })

  const services = await payload.find({
    collection: 'services',
    depth: 1,
    limit: 6,
    page: pageNumber,
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Servicios</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="services"
          currentPage={services.page}
          limit={6}
          totalDocs={services.totalDocs}
        />
      </div>

      <CollectionArchive prefix="servicios" items={services.docs} showCardCategories={true}  />

      <div className="container">
        {services.totalPages > 1 && services.page && (
          <Pagination pageName='services' page={services.page} totalPages={services.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata({ params: { pageNumber = 2 } }): Metadata {
  return {
    title: `Servicios Página N° ${pageNumber} | Distrito Joven `,
  }
}

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    depth: 0,
    limit: 10,
  })

  const pages: number[] = []

  for (let i = 1; i <= services.totalPages; i++) {
    pages.push(i)
  }

  return pages
}
