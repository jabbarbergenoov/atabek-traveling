import { CalendarCheck2, CheckCircle2, Send, X } from "lucide-react"
import { useState } from "react"
import type { Excursion, Lang } from "./routes"
import { motion, } from 'framer-motion'

export default function BookingForm({ selectedExcursion, lang, onSuccess }: { 
  selectedExcursion: Excursion, 
  lang: Lang, 
  onSuccess: () => void 
}) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    phone: '',
    people_count: '',
    destination: '',
    from_location: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      age: Number(formData.age),
      phone: formData.phone,
      people_count: Number(formData.people_count),
      destination: selectedExcursion.title,
      from_location: formData.from_location || "Qo‘ng‘irot"
    }

    try {
      const response = await fetch('https://nazarov-travel.uz/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          onSuccess()
        }, 2000)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.')
      }
    } catch (err) {
      setError('Tarmoq xatoligi. Iltimos, internet aloqangizni tekshirib, qaytadan urinib ko‘ring.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 text-center"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-700 mb-2">Bron qilindi!</h3>
        <p className="text-green-600">
          {lang === 'uz' 
            ? "So‘rovingiz qabul qilindi. Tez orada siz bilan bog‘lanamiz." 
            : "Sorawıńız qabıl etildi. Tez arada siz benen baylanısamız."}
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <CalendarCheck2 size={22} className="text-violet-500" />
        {lang === 'uz' ? 'Ekskursiyani bron qilish' : 'Ekskursiyanı bron qılıw'}
      </h4>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {lang === 'uz' ? 'Ism' : 'Atı'} *
          </label>
          <input
            type="text"
            name="first_name"
            required
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder={lang === 'uz' ? 'Ismingiz' : 'Atıńız'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {lang === 'uz' ? 'Familiya' : 'Familiyası'} *
          </label>
          <input
            type="text"
            name="last_name"
            required
            value={formData.last_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder={lang === 'uz' ? 'Familiyangiz' : 'Familiyańız'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {lang === 'uz' ? 'Yosh' : 'Jası'} *
          </label>
          <input
            type="number"
            name="age"
            required
            min="1"
            max="120"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="25"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {lang === 'uz' ? 'Telefon raqam' : 'Telefon nomeri'} *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="+998 90 123 45 67"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {lang === 'uz' ? 'Odamlar soni' : 'Adamlar sanı'} *
          </label>
          <input
            type="number"
            name="people_count"
            required
            min="1"
            max="50"
            value={formData.people_count}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {lang === 'uz' ? 'Qayerdan kelasiz?' : 'Qaydan kelesiz?'}
          </label>
          <input
            type="text"
            name="from_location"
            value={formData.from_location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder={lang === 'uz' ? 'Qo‘ng‘irot' : 'Qońırat'}
          />
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4">
        <p className="text-sm text-slate-600">
          <span className="font-semibold">{lang === 'uz' ? 'Ekskursiya:' : 'Ekskursiya:'}</span> {selectedExcursion.title}
        </p>
        <p className="text-sm text-slate-600">
          <span className="font-semibold">{lang === 'uz' ? 'Narxi:' : 'Narıq:'}</span> {selectedExcursion.price}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 py-3 bg-gradient-to-r ${selectedExcursion.gradient} text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {lang === 'uz' ? 'Yuborilmoqda...' : 'Jiberilmede...'}
            </>
          ) : (
            <>
              <Send size={18} />
              {lang === 'uz' ? 'Bron qilish' : 'Bron qılıw'}
            </>
          )}
        </motion.button>
        
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSuccess}
          className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition"
        >
          <X size={18} />
        </motion.button>
      </div>
    </form>
  )
} 