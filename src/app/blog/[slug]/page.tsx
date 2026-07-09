import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Calendar, ArrowLeft, Tag } from 'lucide-react'
import { BLOG_POSTS, getPostBySlug } from '../../../lib/blog'

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage(
  props: { params: Promise<{ slug: string }> | { slug: string } }
) {
  // Await params for Next.js 15+ compatibility
  const resolvedParams = await props.params;
  const post = getPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="w-full max-w-3xl mx-auto px-4 py-12 min-h-screen">
      
      <Link href="/blog" className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-cyan transition-colors mb-12 font-mono text-sm uppercase font-bold tracking-wider">
        <ArrowLeft className="w-4 h-4" />
        Return_to_Logs
      </Link>

      <header className="mb-12 border-b border-slate-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar className="w-4 h-4 text-brand-purple" />
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex gap-2 items-center">
            <Tag className="w-4 h-4 text-brand-cyan" />
            {post.tags.map(tag => (
              <span key={tag} className="text-brand-cyan/90 bg-brand-cyan/10 px-2 py-0.5 rounded-full border border-brand-cyan/20">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="w-full text-slate-300 leading-relaxed 
        [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mb-6 [&>h1]:mt-8
        [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-brand-purple [&>h2]:border-b [&>h2]:border-slate-800 [&>h2]:pb-2 [&>h2]:mb-4 [&>h2]:mt-10
        [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-brand-cyan [&>h3]:mb-3 [&>h3]:mt-6
        [&>p]:mb-6
        [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2
        [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2
        [&_a]:text-brand-purple hover:[&_a]:text-brand-cyan [&_a]:underline [&_a]:transition-colors
        [&_strong]:text-white [&_strong]:font-bold
        [&_code:not(pre_code)]:text-brand-pink [&_code:not(pre_code)]:bg-slate-900 [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded-md [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-sm
        [&_pre]:bg-[#0a0f18] [&_pre]:border [&_pre]:border-slate-800 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-6
        [&_pre_code]:text-slate-300 [&_pre_code]:font-mono [&_pre_code]:text-sm
        [&_blockquote]:border-l-4 [&_blockquote]:border-brand-purple [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-400 [&_blockquote]:mb-6
      ">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const {children, className, node, ...rest} = props
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <code className={className} {...rest}>
                  {children}
                </code>
              ) : (
                <code className={className} {...rest}>
                  {children}
                </code>
              )
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

    </article>
  )
}
