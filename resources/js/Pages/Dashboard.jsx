import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    PlusIcon,
    ClipboardDocumentIcon,
    CheckCircleIcon,
    ArrowTopRightOnSquareIcon,
    ClockIcon,
    ForwardIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard({ auth, shortlinks, flash }) {
    const [copiedLink, setCopiedLink] = useState(null);

    const copyToClipboard = (link) => {
        navigator.clipboard.writeText(link);
        setCopiedLink(link);
        setTimeout(() => setCopiedLink(null), 2000); // Reset after 2 seconds
    };

    const EmptyState = () => (
        <div className="text-center py-12">
            <svg
                className="mx-auto h-12 w-12 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-slate-900">Belum ada shortlink</h3>
            <p className="mt-1 text-sm text-slate-500">Mulai buat shortlink pertama Anda sekarang.</p>
        </div>
    );

    const StatusBadge = ({ target }) => {
        if (target === 1) {
            return (
                <span className="inline-flex items-center gap-x-1.5 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    <ClockIcon className="h-3.5 w-3.5" />
                    Menunggu Klik Pertama
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                <ForwardIcon className="h-3.5 w-3.5" />
                Aktif ke Link 2
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-slate-800 leading-tight">Dashboard</h2>
                    <Link
                        href={route('shortlinks.create')}
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <PlusIcon className="-ml-0.5 h-5 w-5" />
                        Buat Shortlink
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 flex items-center gap-x-3 bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-lg relative" role="alert">
                            <CheckCircleIcon className="h-6 w-6" />
                            <span className="font-medium">{flash.success}</span>
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        {shortlinks.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <>
                                {/* Tampilan Tabel untuk Desktop (md and up) */}
                                <div className="hidden md:block">
                                    <table className="min-w-full divide-y divide-slate-200">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Shortlink</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Tujuan Berikutnya</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-slate-200">
                                            {shortlinks.map((link) => {
                                                const fullLink = route('shortlink.redirect', link.slug);
                                                return (
                                                    <tr key={link.id} className="hover:bg-slate-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center gap-x-3">
                                                                <button
                                                                    onClick={() => copyToClipboard(fullLink)}
                                                                    className="text-slate-500 hover:text-indigo-600"
                                                                >
                                                                    {copiedLink === fullLink ? (
                                                                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                                                    ) : (
                                                                        <ClipboardDocumentIcon className="h-5 w-5" />
                                                                    )}
                                                                </button>
                                                                <a href={fullLink} target="_blank" className="text-indigo-600 hover:text-indigo-900 font-medium truncate">
                                                                    .../go/{link.slug}
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-slate-500 truncate max-w-sm">
                                                            {link.current_target === 1 ? link.link_1 : link.link_2}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <StatusBadge target={link.current_target} />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Tampilan Kartu untuk Mobile (up to md) */}
                                <div className="md:hidden divide-y divide-slate-200">
                                    {shortlinks.map((link) => {
                                        const fullLink = route('shortlink.redirect', link.slug);
                                        return (
                                            <div key={link.id} className="p-4 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <a href={fullLink} target="_blank" className="text-indigo-600 font-semibold truncate">
                                                        .../go/{link.slug}
                                                    </a>
                                                    <StatusBadge target={link.current_target} />
                                                </div>
                                                <div className="text-sm">
                                                    <p className="text-slate-600 font-medium">Tujuan Berikutnya:</p>
                                                    <p className="text-slate-500 truncate">{link.current_target === 1 ? link.link_1 : link.link_2}</p>
                                                </div>
                                                <div className="flex items-center gap-x-4">
                                                    <button onClick={() => copyToClipboard(fullLink)} className="flex-1 inline-flex justify-center items-center gap-x-2 text-sm font-medium text-slate-600 hover:text-indigo-600">
                                                        {copiedLink === fullLink ? (
                                                            <>
                                                                <CheckCircleIcon className="h-4 w-4 text-green-500" /> Disalin!
                                                            </>
                                                        ) : (
                                                             <>
                                                                <ClipboardDocumentIcon className="h-4 w-4" /> Salin
                                                            </>
                                                        )}
                                                    </button>
                                                    <a href={fullLink} target="_blank" className="flex-1 inline-flex justify-center items-center gap-x-2 text-sm font-medium text-slate-600 hover:text-indigo-600">
                                                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                                        Buka
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}