import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Compass,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  User,
  Shield,
  MapPinned,
  Phone,
  Send,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import axios from 'axios'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await axios.post("https://d87a-188-113-244-29.ngrok-free.app/auth/login", {
        login: login,
        password: password,
      })

      // Save tokens
      const { access_token, refresh_token } = response.data
      
      if (access_token && refresh_token) {
        // Store tokens in localStorage
        localStorage.setItem('accessToken', access_token)
        localStorage.setItem('refreshToken', refresh_token)
        
        // Store user info if needed (optional)
        // You can decode the JWT token to get user info
        try {
          const payload = JSON.parse(atob(access_token.split('.')[1]))
          localStorage.setItem('userLogin', payload.login)
          localStorage.setItem('userId', payload.sub)
        } catch (e) {
          console.error('Failed to decode token', e)
        }
        
        // Remember me functionality
        if (rememberMe) {
          localStorage.setItem('rememberedLogin', login)
        } else {
          localStorage.removeItem('rememberedLogin')
        }
        
        // Redirect to home page
        navigate({ to: '/' })
      } else {
        setError('Serverdan token olinmadi')
      }
    } catch (err: any) {
      console.error('Login error:', err)
      
      // Handle different error scenarios
      if (err.response) {
        // Server responded with error
        const status = err.response.status
        const message = err.response.data?.message || err.response.data?.error
        
        if (status === 401) {
          setError('Login yoki parol noto‘g‘ri')
        } else if (status === 400) {
          setError(message || 'Noto‘g‘ri so‘rov')
        } else if (status === 404) {
          setError('Server topilmadi. Iltimos, keyinroq urinib ko‘ring')
        } else {
          setError(message || 'Kirishda xatolik yuz berdi')
        }
      } else if (err.request) {
        // Request was made but no response
        setError('Server bilan bog‘lanishda xatolik. Internet aloqasini tekshiring')
      } else {
        // Something else happened
        setError('Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Load remembered login on component mount
  useState(() => {
    const rememberedLogin = localStorage.getItem('rememberedLogin')
    if (rememberedLogin) {
      setLogin(rememberedLogin)
      setRememberMe(true)
    }
  })

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
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Левая часть - информация о компании */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
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
                  Orolbo‘yi sirli olamiga
                </span>
                <br />
                <span className="text-slate-800">xush kelibsiz</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-slate-600 mb-8 leading-relaxed"
              >
                Xivaning qadimiy ko‘chalarida kezish, Orol dengizi qoldiqlarini ko‘rish 
                va muqaddas ziyoratgohlarni ziyorat qilish — bularning barchasi sizni kutmoqda.
              </motion.p>

              {/* Преимущества */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                {[
                  { icon: MapPinned, text: '5 xil ekskursiya turlari' },
                  { icon: Shield, text: '100% sifat kafolati' },
                  { icon: Phone, text: '24/7 qo‘llab-quvvatlash' },
                  { icon: Send, text: 'Tezkor bron qilish' },
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
                      <div className="w-10 h-10 bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-violet-600" />
                      </div>
                      <span className="text-slate-700">{item.text}</span>
                    </motion.div>
                  )
                })}
              </motion.div>

            </div>
          </motion.div>

          {/* Правая часть - форма логина */}
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
                  <User className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Tizimga kirish</h2>
                <p className="text-sm text-slate-500">
                  Hisobingizga kiring va sayohatni boshlang
                </p>
              </div>

              {/* Форма */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Login поле (email or username) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Login yoki Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition"
                      placeholder="login yoki email"
                      required
                    />
                  </div>
                </div>

                {/* Пароль поле */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Parol
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Дополнительные опции */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                    />
                    <span className="text-sm text-slate-600">Eslab qolish</span>
                  </label>
                  <a href="#" className="text-sm text-violet-600 hover:text-violet-700 transition">
                    Parolni unutdingizmi?
                  </a>
                </div>

                {/* Ошибка */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Кнопка входа */}
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
                      Kirish...
                    </>
                  ) : (
                    <>
                      <LogIn size={20} />
                      Kirish
                    </>
                  )}
                </motion.button>

                {/* Demo ma'lumotlar */}
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                    <Shield size={12} />
                    Demo ma'lumotlar:
                  </p>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>Login: <span className="font-mono text-violet-600">admin</span></p>
                    <p>Parol: <span className="font-mono text-violet-600">admin123</span></p>
                    <p className="text-slate-400 text-[10px] mt-1">* Haqiqiy serverga ulangan</p>
                  </div>
                </div>
              </form>

              {/* Регистрация */}
              <p className="text-center text-sm text-slate-500 mt-6">
                Hisobingiz yo'qmi?{' '}
                <Link
                  to="/register"
                  className="text-violet-600 hover:text-violet-700 font-medium transition"
                >
                  Ro'yxatdan o'tish
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}