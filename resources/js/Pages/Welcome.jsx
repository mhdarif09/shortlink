// File: resources/js/Pages/Landing.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { LinkIcon, ZapIcon, ShieldCheckIcon } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-6 md:px-16 py-4 backdrop-blur-sm sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-600">Short<span className="text-gray-900">link</span></h1>
        <div className="space-x-4 text-sm font-medium hidden md:block">
          <a href="#features" className="hover:text-blue-600 transition">Fitur</a>
          <a href="#example" className="hover:text-blue-600 transition">Demo</a>
          <a href="#about" className="hover:text-blue-600 transition">Tentang</a>
        </div>
        <Link
          href="/login"
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
        >
          Masuk
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 md:px-20 py-20">
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ubah Link Panjang Jadi <span className="text-blue-600">Pendek & Elegan</span>
        </motion.h2>
        <p className="text-gray-600 text-lg md:w-2/3 mb-10">
          Shortlink membantu Anda mempersingkat tautan, melacak klik, dan membagikan link profesional dengan mudah.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/register"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
          >
            Mulai Gratis
          </Link>
          <a
            href="#example"
            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-medium"
          >
            Lihat Demo
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 md:px-20 py-20 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12">Fitur Unggulan</h3>
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<LinkIcon size={36} className="text-blue-600" />}
            title="Tautan Pendek Instan"
            desc="Ubah URL panjang menjadi singkat hanya dalam hitungan detik."
          />
          <FeatureCard
            icon={<ZapIcon size={36} className="text-blue-600" />}
            title="Cepat & Efisien"
            desc="Dirancang dengan performa tinggi untuk pengalaman pengguna terbaik."
          />
          <FeatureCard
            icon={<ShieldCheckIcon size={36} className="text-blue-600" />}
            title="Keamanan Terjamin"
            desc="Kami melindungi tautan Anda dari spam, malware, dan penyalahgunaan."
          />
        </div>
      </section>

      {/* Example */}
      <section id="example" className="px-6 md:px-20 py-20 bg-gray-50 text-center">
        <h3 className="text-3xl font-bold mb-8">Contoh Penggunaan</h3>
        <p className="text-gray-600 mb-10">Masukkan link Anda dan lihat hasilnya secara instan.</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Tempelkan URL panjang di sini..."
            className="w-full md:w-2/3 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Pendekkan
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="mt-auto py-10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Shortlink — Dibuat dengan ❤️ untuk produktivitas.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition text-center"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{desc}</p>
    </motion.div>
  );
}
