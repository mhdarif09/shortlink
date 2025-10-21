// resources/js/Components/ShortLinkList.jsx

import React from 'react';

export default function ShortLinkList({ links = [], loading = false }) {
    if (loading) {
        return <div className="p-6">Memuat data...</div>;
    }

    if (links.length === 0) {
        return <div className="p-6">Anda belum memiliki shortlink.</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shortlink</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tujuan 1</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tujuan 2</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {links.map((link) => (
                        <tr key={link.id}>
                            <td className="px-6 py-4">
                                <a href={`/go/${link.slug}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900 font-medium">
                                    {window.location.origin}/go/{link.slug}
                                </a>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs" title={link.link_1}>
                                {link.link_1}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs" title={link.link_2}>
                                {link.link_2}
                            </td>
                            <td className="px-6 py-4">
                                {link.current_target === 1 ? (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        Menuju Link 1
                                    </span>
                                ) : (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Menuju Link 2
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}