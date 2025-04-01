import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function MarkdownRenderer({ content }) {
    return (
        <div className="prose prose-sm max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code(props) {
                        const { children, className, node, ...rest } = props
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                            <SyntaxHighlighter
                                {...rest}
                                PreTag="div"
                                children={String(children).replace(/\n$/, '')}
                                language={match[1]}
                                style={vscDarkPlus}
                                className="rounded-lg"
                            />
                        ) : (
                            <code {...rest} className="px-1.5 py-0.5 rounded">
                                {children}
                            </code>
                        );
                    },
                    table({ children }) {
                        return (
                            <div className="overflow-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    {children}
                                </table>
                            </div>
                        );
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}