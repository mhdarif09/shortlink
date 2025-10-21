// resources/js/Components/ShortLinkForm.jsx

import React, { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import axios from 'axios';

export default function ShortLinkForm({ onLinkCreated }) {
    const [formData, setFormData] = useState({
        slug: '',
        link_1: '',
        link_2: '',
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        axios.post('/api/shortlinks', formData)
            .then(response => {
                onLinkCreated(response.data.shortlink);
                setFormData({ slug: '', link_1: '', link_2: '' }); // Reset form
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    setErrors(error.response.data.errors);
                }
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    return (
        <div className="p-6 bg-white shadow-sm sm:rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Buat Shortlink Baru</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <InputLabel htmlFor="slug" value="Nama Shortlink (contoh: event-jakarta)" />
                    <div className="flex items-center mt-1">
                        <span className="text-gray-500 mr-2">{window.location.origin}/go/</span>
                        <TextInput id="slug" name="slug" value={formData.slug} className="block w-full" onChange={handleChange} required />
                    </div>
                    <InputError message={errors.slug?.[0]} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="link_1" value="Link Tujuan Pertama" />
                    <TextInput id="link_1" type="url" name="link_1" value={formData.link_1} className="mt-1 block w-full" onChange={handleChange} required />
                    <InputError message={errors.link_1?.[0]} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="link_2" value="Link Tujuan Kedua" />
                    <TextInput id="link_2" type="url" name="link_2" value={formData.link_2} className="mt-1 block w-full" onChange={handleChange} required />
                    <InputError message={errors.link_2?.[0]} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}