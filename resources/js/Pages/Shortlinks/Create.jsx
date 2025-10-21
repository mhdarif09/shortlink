import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        slug: '',
        link_1: '',
        link_2: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('shortlinks.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-slate-800 leading-tight">
                        Buat Shortlink Baru
                    </h2>
                    <Link
                        href={route('dashboard')}
                        className="text-sm text-slate-600 hover:text-slate-900"
                    >
                        &larr; Kembali ke Dashboard
                    </Link>
                </div>
            }
        >
            <Head title="Buat Shortlink" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <form onSubmit={submit}>
                            <div className="p-6 md:p-8 space-y-6">
                                <div>
                                    <InputLabel htmlFor="slug" value="Nama Unik (Slug)" />
                                    <p className="mt-1 text-sm text-slate-500">
                                        Ini akan menjadi bagian akhir dari shortlink Anda. Gunakan huruf, angka, dan tanda hubung.
                                    </p>
                                    <div className="mt-2 flex items-center rounded-md shadow-sm">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 sm:text-sm">
                                            {window.location.host}/go/
                                        </span>
                                        <TextInput
                                            id="slug"
                                            name="slug"
                                            value={data.slug}
                                            className="block w-full rounded-l-none"
                                            onChange={(e) => setData('slug', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.slug} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="link_1" value="Link Tujuan Pertama" />
                                     <p className="mt-1 text-sm text-slate-500">
                                        Pengguna akan diarahkan ke sini saat pertama kali mengklik shortlink.
                                    </p>
                                    <TextInput
                                        id="link_1"
                                        type="url"
                                        name="link_1"
                                        value={data.link_1}
                                        className="mt-2 block w-full"
                                        onChange={(e) => setData('link_1', e.target.value)}
                                        required
                                        placeholder="https://contoh-link-pertama.com"
                                    />
                                    <InputError message={errors.link_1} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="link_2" value="Link Tujuan Kedua" />
                                    <p className="mt-1 text-sm text-slate-500">
                                        Setelah diklik sekali, semua kunjungan berikutnya akan diarahkan ke sini.
                                    </p>
                                    <TextInput
                                        id="link_2"
                                        type="url"
                                        name="link_2"
                                        value={data.link_2}
                                        className="mt-2 block w-full"
                                        onChange={(e) => setData('link_2', e.target.value)}
                                        required
                                        placeholder="https://contoh-link-kedua.com"
                                    />
                                    <InputError message={errors.link_2} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-4 bg-slate-50 px-6 py-4 text-right">
                                <PrimaryButton disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Simpan Shortlink'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}