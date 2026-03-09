import type { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MarkdownViewerProps = {
  title: string
  markdown: string
  showHeader?: boolean
}

const MarkdownViewer: FC<MarkdownViewerProps> = ({ title, markdown, showHeader = true }) => {
  return (
    <div className="flex h-full flex-col bg-slate-950 text-slate-50">
      {showHeader && (
        <header className="border-b border-slate-800 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-50">{title}</h2>
        </header>
      )}
      <div className="scrollbar-thin scrollbar-thumb-slate-700/70 scrollbar-track-slate-900/80 flex-1 overflow-y-auto px-4 py-3 text-sm leading-relaxed text-slate-200">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="mb-4 text-xl font-semibold text-slate-50" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="mt-4 mb-3 text-lg font-semibold text-slate-50" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="mt-3 mb-2 text-base font-semibold text-slate-50" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-2 text-sm text-slate-200" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="mb-2 list-disc pl-5 text-sm text-slate-200" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="mb-2 list-decimal pl-5 text-sm text-slate-200" {...props} />
            ),
            li: ({ node, ...props }) => <li className="mb-0.5" {...props} />,
            a: ({ node, ...props }) => (
              // eslint-disable-next-line jsx-a11y/anchor-has-content
              <a
                className="text-sky-400 underline-offset-2 hover:text-sky-300 hover:underline"
                {...props}
              />
            ),
            code: ({ node, ...props }) => (
              <code
                className="rounded bg-slate-900/80 px-1.5 py-0.5 text-xs text-sky-300"
                {...props}
              />
            ),
            table: ({ node, ...props }) => (
              <div className="mb-3 overflow-x-auto">
                <table
                  className="w-full border-collapse text-xs text-slate-100"
                  {...props}
                />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead className="bg-slate-900/80" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th
                className="border border-slate-700 px-2 py-1 text-left font-semibold"
                {...props}
              />
            ),
            td: ({ node, ...props }) => (
              <td className="border border-slate-800 px-2 py-1 align-top" {...props} />
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default MarkdownViewer

