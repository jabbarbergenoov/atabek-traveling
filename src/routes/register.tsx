import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Compass,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Shield,
  MapPinned,
  Phone,
  Send,
  UserPlus,
  Smartphone,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import axios from 'axios'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      setError('Barcha maydonlarni to‘ldiring')
      return false
    }
    
    if (formData.password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo‘lishi kerak')
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Parollar mos kelmadi')
      return false
    }
    
    if (!agreeTerms) {
      setError('Foydalanish shartlariga rozilik bildiring')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!validateForm()) return
    
    setIsLoading(true)

    try {
      const signUpData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        login: formData.email, 
        password: formData.password,
      }

      // Make API call
      const response = await axios.post('https://d87a-188-113-244-29.ngrok-free.app/auth/sign-up', signUpData)
      
      // Handle successful registration
      if (response.status === 200 || response.status === 201) {
        // Save user data if needed
        console.log(response.data)
        const accessToken = response.data.access_token
        const refreshToken = response.data.refresh_token
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        
        navigate({ to: '/login' })
      }
    } catch (err: any) {
      // Handle errors
      if (err.response) {
        // Server responded with error
        const errorMessage = err.response.data?.message || 
                           err.response.data?.error || 
                           'Ro‘yxatdan o‘tishda xatolik yuz berdi'
        setError(errorMessage)
      } else if (err.request) {
        // Request was made but no response
        setError('Server bilan bog‘lanishda xatolik. Iltimos, keyinroq urinib ko‘ring.')
      } else {
        // Something else happened
        setError('Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-violet-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-fuchsia-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Основной контент */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Левая часть - информация о компании */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block sticky top-8"
          >
            <div className="relative">
              {/* Логотип */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl blur-lg opacity-70" />
                  <div className="relative w-16 h-16 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                    <Compass className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    Atabek Traveling
                  </h1>
                  <p className="text-sm text-slate-500">Qo‘ng‘irot ekskursiya markazi</p>
                </div>
              </motion.div>

              {/* Заголовок */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold mb-4"
              >
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
                  Sayohat sarguzashtlari
                </span>
                <br />
                <span className="text-slate-800">sizni kutmoqda</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-slate-600 mb-8 leading-relaxed"
              >
                Ro'yxatdan o'ting va Orolbo'yi sirli olamiga sayohat qiling. 
                Xiva, Mo'ynoq va boshqa qadimiy shaharlarni kashf eting.
              </motion.p>

              {/* Преимущества регистрации */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                {[
                  { icon: CheckCircle, text: 'Ekskursiyalarni bron qilish' },
                  { icon: CheckCircle, text: 'Maxsus takliflar va chegirmalar' },
                  { icon: CheckCircle, text: 'Sayohat tarixini kuzatish' },
                  { icon: CheckCircle, text: '24/7 qo‘llab-quvvatlash' },
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-slate-700">{item.text}</span>
                    </motion.div>
                  )
                })}
              </motion.div>

            </div>
          </motion.div>

          {/* Правая часть - форма регистрации */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200/50">
              {/* Заголовок формы */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <UserPlus className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Ro'yxatdan o'tish</h2>
                <p className="text-sm text-slate-500">
                  Hisob yarating va sayohatni boshlang
                </p>
              </div>

              {/* Форма */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Ism va Familiya */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Ism
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition text-sm"
                        placeholder="Ism"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Familiya
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition text-sm"
                        placeholder="Familiya"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition text-sm"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Telefon raqam */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Telefon raqam
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition text-sm"
                      placeholder="+998 90 123 45 67"
                      required
                    />
                  </div>
                </div>

                {/* Parol */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Parol
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-9 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition text-sm"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Parolni tasdiqlash */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Parolni tasdiqlash
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-9 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition text-sm"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Foydalanish shartlari */}
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-1 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                  />
                  <span className="text-xs text-slate-600">
                    Men <a href="#" className="text-violet-600 hover:text-violet-700">foydalanish shartlari</a> va{' '}
                    <a href="#" className="text-violet-600 hover:text-violet-700">maxfiylik siyosati</a> bilan tanishdim va roziman
                  </span>
                </label>

                {/* Ошибка */}
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

                {/* Кнопка регистрации */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-violet-200 hover:shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Ro'yxatdan o'tish...
                    </>
                  ) : (
                    <>
                      <UserPlus size={20} />
                      Ro'yxatdan o'tish
                    </>
                  )}
                </motion.button>
              </form>

              {/* Разделитель */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-slate-400">yoki</span>
                </div>
              </div>

              {/* Ссылка на вход */}
              <p className="text-center text-sm text-slate-500">
                Hisobingiz bormi?{' '}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    navigate({ to: '/login' })
                  }}
                  className="text-violet-600 hover:text-violet-700 font-medium transition"
                >
                  Tizimga kirish
                </a>
              </p>

              {/* Безопасность */}
              <div className="mt-6 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Shield size={12} />
                  Ma'lumotlaringiz himoyalangan va maxfiy
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}