import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayloadHMR({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 6,
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={6}
          totalDocs={posts.totalDocs}
          collectionLabels={{
            singular: 'Post',
            plural: 'Posts',
          }}
        />
      </div>

      <CollectionArchive prefix="posts" items={posts.docs} showCardCategories={true} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination pageName='posts' page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Posts`,
  }
}
