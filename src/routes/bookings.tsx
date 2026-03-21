import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  CalendarCheck2,
  MapPin,
  Phone,
  User,
  Users,
  Clock,
  AlertCircle,
  ArrowLeft,
  Plus,
  X,
  Send,
  Loader2,
  ChevronRight,
  Building2,
} from 'lucide-react'
import { axiosInstance } from '@/lib/axiosInstance'

type Lang = 'uz' | 'kaa'

type Booking = {
  id: number
  first_name: string
  last_name: string
  age: number
  phone: string
  people_count: number
  destination: string
  from_location: string
  created_at: string
}

type CreateBookingData = {
  first_name: string
  last_name: string
  age: number
  phone: string
  people_count: number
  destination: string
  from_location: string
}

const translations = {
  uz: {
    title: 'Mening bronlarim',
    subtitle: 'Sayohatlaringiz tarixi',
    newBooking: 'Yangi bron',
    noBookings: 'Hali bronlar yo\'q',
    noBookingsDesc: 'Birinchi sayohatingizni rejalashtiring!',
    createNew: 'Yangi bron qilish',
    loading: 'Bronlar yuklanmoqda...',
    error: 'Bronlarni yuklashda xatolik yuz berdi',
    retry: 'Qayta urinib ko\'rish',
    details: 'Batafsil',
    call: 'Qo\'ng\'iroq qilish',
    close: 'Yopish',
    // Form
    createBooking: 'Yangi bron qilish',
    planTrip: 'Sayohatingizni rejalashtiring',
    firstName: 'Ism',
    lastName: 'Familiya',
    age: 'Yosh',
    phone: 'Telefon raqam',
    phoneFormat: 'Format: +998 XX XXX XX XX',
    peopleCount: 'Odamlar soni',
    fromLocation: 'Jo\'nash joyi',
    destination: 'Boradigan joy',
    selectDestination: 'Boradigan joyni tanlang',
    cancel: 'Bekor qilish',
    submit: 'Bron qilish',
    submitting: 'Yuborilmoqda...',
    // Validation errors
    nameRequired: 'Iltimos, ismingizni kiriting',
    lastNameRequired: 'Iltimos, familiyangizni kiriting',
    phoneInvalid: 'Telefon raqam to‘liq emas. Format: +998 XX XXX XX XX',
    peopleCountInvalid: 'Odamlar soni 1 dan 20 gacha bo‘lishi kerak',
    destinationRequired: 'Iltimos, boradigan joyni tanlang',
    fromLocationRequired: 'Iltimos, jo\'nash joyini kiriting',
    ageInvalid: 'Yosh 1 dan 120 gacha bo‘lishi kerak',
    // Booking details
    nameSurname: 'Ism va familiya',
    bookedAt: 'Bron qilingan vaqt',
    people: 'kishi',
    years: 'yosh'
  },
  kaa: {
    title: 'Meniń bronlarım',
    subtitle: 'Sayaxatlarıńız',
    newBooking: 'Jańa bron',
    noBookings: 'Áli bronlar joq',
    noBookingsDesc: 'Birinchi sayaxatıńızdı rejelastiriń!',
    createNew: 'Jańa bron qılıw',
    loading: 'Bronlar júklenbekte...',
    error: 'Bronlardı júklewde qátelik júz berdi',
    retry: 'Qayta urınıp kóriw',
    details: 'Tolıq',
    call: 'Qońıraw qılıw',
    close: 'Jabıw',
    // Form
    createBooking: 'Jańa bron qılıw',
    planTrip: 'Sayaxatıńızdı rejelastiriń',
    firstName: 'Atı',
    lastName: 'Familiyası',
    age: 'Jası',
    phone: 'Telefon nomeri',
    phoneFormat: 'Format: +998 XX XXX XX XX',
    peopleCount: 'Adamlar sanı',
    fromLocation: 'Ketiw jerı',
    destination: 'baratin jer',
    selectDestination: 'baratin jerdi tańlań',
    cancel: 'Bekor qılıw',
    submit: 'Bron qılıw',
    submitting: 'Jiberilmekte...',
    // Validation errors
    nameRequired: 'Iltimas, atıńızdı kiriń',
    lastNameRequired: 'Iltimas, familiyańızdı kiriń',
    phoneInvalid: 'Telefon nomer tolıq emes. Format: +998 XX XXX XX XX',
    peopleCountInvalid: 'Adamlar sanı 1 den 20 ge shekem bolıwı kerek',
    destinationRequired: 'Iltimas, baratin jerdi tańlań',
    fromLocationRequired: 'Iltimas, ketiw jerińizdi kiriń',
    ageInvalid: 'Jas 1 den 120 ge shekem bolıwı kerek',
    nameSurname: 'Atı hám familiyası',
    bookedAt: 'Bron etilgen waqıt',
    people: 'adam',
    years: 'jas'
  }
}

export const Route = createFileRoute('/bookings')({
  component: BookingsPage,
})

function BookingsPage() {
  const navigate = useNavigate()
  const [lang, setLang] = useState<Lang>('uz')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  
  const [formData, setFormData] = useState<CreateBookingData>({
    first_name: '',
    last_name: '',
    age: 18,
    phone: '+998',
    people_count: 1,
    destination: '',
    from_location: 'Qo‘ng‘irot',
  })

  const t = translations[lang]

  const destinations = [
    'Xiva',
    'Mo‘ynoq',
    'Mizdaxkon (Mazlumxon)',
    'Sulton Uvays',
    'Dauit Ota'
  ]

  // Fetch bookings on mount
  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await axiosInstance.get('/bookings/my')
      setBookings(response.data)
    } catch (err: any) {
      console.error('Error fetching bookings:', err)
      if (err.response?.status === 401) {
        navigate({ to: '/login' })
      } else {
        setError(t.error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    setError('')
    
    // Validate all fields
    if (!formData.first_name.trim()) {
      setError(t.nameRequired)
      setIsCreating(false)
      return
    }
    
    if (!formData.last_name.trim()) {
      setError(t.lastNameRequired)
      setIsCreating(false)
      return
    }
    
    // Validate phone number - must be exactly +998 XX XXX XX XX format
    const phoneDigits = formData.phone.replace(/[^\d]/g, '')
    if (phoneDigits.length !== 12 || !phoneDigits.startsWith('998')) {
      setError(t.phoneInvalid)
      setIsCreating(false)
      return
    }
    
    if (formData.age < 1 || formData.age > 120) {
      setError(t.ageInvalid)
      setIsCreating(false)
      return
    }
    
    if (formData.people_count < 1 || formData.people_count > 20) {
      setError(t.peopleCountInvalid)
      setIsCreating(false)
      return
    }
    
    if (!formData.destination) {
      setError(t.destinationRequired)
      setIsCreating(false)
      return
    }
    
    if (!formData.from_location.trim()) {
      setError(t.fromLocationRequired)
      setIsCreating(false)
      return
    }
    
    try {
      const response = await axiosInstance.post('/bookings', formData)
      setBookings([response.data, ...bookings])
      setShowCreateModal(false)
      resetForm()
    } catch (err: any) {
      console.error('Error creating booking:', err)
      setError(err.response?.data?.message || t.error)
    } finally {
      setIsCreating(false)
    }
  }

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      age: 18,
      phone: '+998',
      people_count: 1,
      destination: '',
      from_location: 'Qo‘ng‘irot',
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      // Format phone number to +998 XX XXX XX XX
      let digits = value.replace(/[^\d]/g, '')
      
      // Always ensure +998 prefix
      if (!digits.startsWith('998')) {
        digits = '998' + digits.replace(/^998/, '')
      }
      
      // Keep only 12 digits (998 + 9 digits)
      if (digits.length > 12) {
        digits = digits.slice(0, 12)
      }
      
      // Format as +998 XX XXX XX XX
      if (digits.length >= 4) {
        const prefix = digits.slice(0, 4)
        let formatted = `+${prefix}`
        
        if (digits.length > 4) {
          const part1 = digits.slice(4, 6)
          formatted += ` ${part1}`
          if (digits.length > 6) {
            const part2 = digits.slice(6, 9)
            formatted += ` ${part2}`
            if (digits.length > 9) {
              const part3 = digits.slice(9, 11)
              formatted += ` ${part3}`
              if (digits.length > 11) {
                const part4 = digits.slice(11, 13)
                formatted += ` ${part4}`
              }
            }
          }
        }
        
        setFormData(prev => ({ ...prev, phone: formatted }))
      } else {
        setFormData(prev => ({ ...prev, phone: `+${digits}` }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'age' || name === 'people_count' ? parseInt(value) || 0 : value
      }))
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
    return new Intl.DateTimeFormat(lang === 'uz' ? 'uz-UZ' : 'kk-KZ', options).format(date)
  }

  const getDestinationIcon = (destination: string) => {
    if (destination.includes('Xiva')) return '🏛️'
    if (destination.includes('Mo‘ynoq')) return '🚢'
    if (destination.includes('Mazlumxon')) return '🕌'
    if (destination.includes('Sulton')) return '⛰️'
    if (destination.includes('Dauit')) return '🌿'
    return '📍'
  }

  const formatPhoneForDisplay = (phone: string) => {
    // Format phone for display
    const digits = phone.replace(/[^\d]/g, '')
    if (digits.length === 12 && digits.startsWith('998')) {
      return `+${digits.slice(0, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 9)} ${digits.slice(9, 11)} ${digits.slice(11, 13)}`
    }
    return phone
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate({ to: '/' })}
                className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition"
              >
                <ArrowLeft size={20} />
              </motion.button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-sm text-slate-500">{t.subtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Language switcher */}
              <div className="flex bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => setLang('uz')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    lang === 'uz' ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  UZ
                </button>
                <button
                  onClick={() => setLang('kaa')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    lang === 'kaa' ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  ҚАА
                </button>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-violet-200 hover:shadow-xl transition"
              >
                <Plus size={18} />
                {t.newBooking}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mb-4" />
            <p className="text-slate-500">{t.loading}</p>
          </div>
        ) : error && bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
          >
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchBookings}
              className="px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
            >
              {t.retry}
            </button>
          </motion.div>
        ) : bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarCheck2 className="w-12 h-12 text-violet-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{t.noBookings}</h3>
            <p className="text-slate-500 mb-6">{t.noBookingsDesc}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="px-8 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-medium flex items-center gap-2 mx-auto shadow-lg"
            >
              <Plus size={20} />
              {t.createNew}
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedBooking(booking)}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-xl flex items-center justify-center text-2xl">
                        {getDestinationIcon(booking.destination)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-violet-600 transition">
                          {booking.destination}
                        </h3>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <MapPin size={14} />
                          {booking.from_location} → {booking.destination}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(booking.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <User size={16} className="text-violet-500" />
                      <span>{booking.first_name} {booking.last_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone size={16} className="text-violet-500" />
                      <span>{formatPhoneForDisplay(booking.phone)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users size={16} className="text-violet-500" />
                      <span>{booking.people_count} {t.people}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock size={16} className="text-violet-500" />
                      <span>{booking.age} {t.years}</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-sm text-violet-600 flex items-center gap-1"
                    >
                      {t.details}
                      <ChevronRight size={16} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Create Booking Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{t.createBooking}</h2>
                    <p className="text-sm text-slate-500">{t.planTrip}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateBooking} className="p-6 space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t.firstName}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                        placeholder={t.firstName}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t.lastName}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                        placeholder={t.lastName}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t.age}
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        min={1}
                        max={120}
                        className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                        placeholder="18"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t.phone}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 font-mono"
                        placeholder="+998 94 027 01 25"
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{t.phoneFormat}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t.peopleCount}
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        name="people_count"
                        value={formData.people_count}
                        onChange={handleInputChange}
                        required
                        min={1}
                        max={20}
                        className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                        placeholder="1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t.fromLocation}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="from_location"
                        value={formData.from_location}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                        placeholder="Qo‘ng‘irot"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.destination}
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 appearance-none cursor-pointer"
                    >
                      <option value="">{t.selectDestination}</option>
                      {destinations.map(dest => (
                        <option key={dest} value={dest}>{dest}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2"
                  >
                    <AlertCircle size={16} />
                    {error}
                  </motion.div>
                )}

                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition"
                  >
                    {t.cancel}
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isCreating}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {t.submitting}
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        {t.submit}
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
            >
              <div className="relative h-48 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-2">{getDestinationIcon(selectedBooking.destination)}</div>
                  <h3 className="text-2xl font-bold">{selectedBooking.destination}</h3>
                  <p className="text-white/80 text-sm mt-1">
                    {selectedBooking.from_location} → {selectedBooking.destination}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 transition"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-500 mb-1">{t.nameSurname}</p>
                    <p className="font-semibold text-slate-800">{selectedBooking.first_name} {selectedBooking.last_name}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-500 mb-1">{t.age}</p>
                    <p className="font-semibold text-slate-800">{selectedBooking.age} {t.years}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-500 mb-1">{t.phone}</p>
                    <p className="font-semibold text-slate-800">{formatPhoneForDisplay(selectedBooking.phone)}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-500 mb-1">{t.peopleCount}</p>
                    <p className="font-semibold text-slate-800">{selectedBooking.people_count} {t.people}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <Calendar size={12} />
                    {t.bookedAt}
                  </p>
                  <p className="font-semibold text-slate-800">{formatDate(selectedBooking.created_at)}</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const cleanPhone = selectedBooking.phone.replace(/[^\d]/g, '')
                      window.location.href = `tel:+${cleanPhone}`
                    }}
                    className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-200 transition"
                  >
                    <Phone size={18} />
                    {t.call}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedBooking(null)}
                    className="flex-1 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-medium"
                  >
                    {t.close}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}