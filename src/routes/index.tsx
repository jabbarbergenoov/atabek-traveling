import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarCheck2,
  CircleDollarSign,
  Globe,
  Headset,
  Landmark,
  MapPinned,
  MessagesSquare,
  Mountain,
  Phone,
  Ship,
  TentTree,
  Compass,
  Star,
  Users,
  Clock,
  Shield,
  Camera,
  Coffee,
  Car,
  Languages,
  Mail,
  MapPin,
  Send,
  X,
  ChevronRight,
  CheckCircle2,
  Handshake,
} from 'lucide-react'

type Lang = 'uz' | 'kaa'
type ExcursionKey = 'khiva' | 'moynaq' | 'mazlumxon' | 'sultonUvays' | 'dauitOta'

type Excursion = {
  id: ExcursionKey
  title: string
  shortTitle: string
  route: string
  duration: string
  price: string
  description: string
  highlights: string[]
  included: string[]
  images: string[]
  icon: typeof Landmark
  gradient: string
}

const excursions: Excursion[] = [
  {
    id: 'khiva',
    title: 'Xiva Tarixiy Shahri',
    shortTitle: 'Xiva',
    route: 'Qo‘ng‘irot – Xiva',
    duration: '1 kun',
    price: '350 000 so‘m',
    description: 'O‘zbekistonning eng qadimiy shaharlaridan biri bo‘lgan Xiva sizni o‘zining sehrli atmosferasi bilan kutib oladi. Ichan qal’a — ochiq osmon ostidagi muzey.',
    highlights: [
      'Ichan qal’a majmuasi',
      'Qadimiy madrasalar',
      'Mahalliy bozor',
      'Kulolchilik ustaxonasi'
    ],
    included: ['Transport', 'Gid xizmati', 'Suv', 'Tushlik'],
   images: [
  'https://images.openai.com/static-rsc-3/mb4HfX-VSUwU7H1kqEGffbGPL3Rhx6BnKj1qw1nxv9AEaitcoCy-kNIAthsGFmOp3uhIg_bRKXhE7KmD3DFP-u86c1EZHEGcPmYW5t3O41M?purpose=fullsize&v=1?w=800',
  'https://images.openai.com/static-rsc-3/MB38ARfjrF7WWYl8uq4PaiOdwQl2KOvEbcCMNZz7i2n6X2l_pqrUfhSKjzClm6XfTbxRVEcfuHAhlCzcGUNxYHGu8aMndRyo8QRoPsGBc4o?purpose=fullsize&v=1?w=800',
  'https://images.openai.com/static-rsc-3/3PJiSQWQm4Fz1640hHdrI6VETO_2-yR011K1ppQ6f-64fP097rXOiWK_whKQu2iyUEwmCowxJI3lHw-TqwwFBo1yjtU2Ki46_PrQXDW1Rw0?purpose=fullsize&v=1?w=800'
]
,
    icon: Landmark,
    gradient: 'from-violet-500 to-fuchsia-500'
  },
  {
    id: 'moynaq',
    title: 'Mo‘ynoq – Orol Dengizi',
    shortTitle: 'Mo‘ynoq',
    route: 'Qo‘ng‘irot – Mo‘ynoq',
    duration: '1 kun',
    price: '400 000 so‘m',
    description: 'Bir vaqtlar dunyodagi eng katta dengizlardan biri bo‘lgan Orol dengizi qoldiqlariga sayohat. Kemalar qabristoni va noyob manzaralar.',
    highlights: [
      'Kemalar qabristoni',
      'Mo‘ynoq muzeyi',
      'Quruq dengiz tubi',
      'Mahalliy baliq taomlari'
    ],
    included: ['Transport', 'Gid', 'Tushlik', 'Suv'],
  images: [
  'https://images.openai.com/static-rsc-3/RU6i2kBHr5WmaMGQyfcEIC8zPZ6KebTPdoW4we9qO13p2tODZKVFUqzNPIT6VUOPokKzaFK1MbCAauBpxQzg88c8DGVDOT6CMhYZUtwRR04?purpose=fullsize&v=1?w=800',
  'https://images.openai.com/static-rsc-3/LNFIjDQdN2MtHytlxDOxOFOjVKR5B6-0eHXfMKXu6KOT0UQ7wDHYl9ei9ORG1pJMaRnMM-rhET-GqiLjrjVM6mmSdW3uVF2yLGIK1SXn4EE?purpose=fullsize&v=1?w=800',
  'https://images.openai.com/static-rsc-3/48GtZX8R8qxVW9HuAqnH6DyqrJShAaj56TsNy519yVyfdjLCoQhdBTtZyDBVqSRTpO6yMFN3p6OOCQUnlFbYIWGXk1iIEnFiYBpFbm0Y3tc?purpose=fullsize&v=1?w=800'
]
,
    icon: Ship,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'mazlumxon',
    title: 'Mazlumxon Sulu Maqbarasi',
    shortTitle: 'Mazlumxon',
    route: 'Qo‘ng‘irot – Mizdaxkon',
    duration: 'Yarim kun',
    price: '200 000 so‘m',
    description: 'Qadimiy Mizdaxkon majmuasida joylashgan noyob me\'moriy yodgorlik. XII asrga oid tarixiy obida va ziyoratgoh.',
    highlights: [
      'Mazlumxon maqbarasi',
      'Qadimiy qabriston',
      'Mizdaxkon majmuasi',
      'Fotosessiya'
    ],
    included: ['Transport', 'Gid', 'Suv'],
    images: [
  'https://images.openai.com/static-rsc-3/7oEugTPwI9zVmgzCq64fae8h2WVR9z-2wmEw7a8ynBBUFmOEDm4qdG1QtnCVY5o0GeoT_rOemsdWeT6neeuAwp_tX082AEa1L0gQvvClHPA?purpose=fullsize&v=1?w=800',
  'https://uzreport.news/fotobank/content/eg4ok7fprzysBmp5gS27imIy2WqzycDb2O0P29fd.jpeg?w=800',
  'https://uzreport.news/fotobank/content/fOz0rXGDLlc2jZrBz0kf8VV1yfinjzJ9d5zrOz0q.jpeg?w=800'
]
,
    icon: TentTree,
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'sultonUvays',
    title: 'Sulton Uvays Ziyoratgohi',
    shortTitle: 'Sulton Uvays',
    route: 'Qo‘ng‘irot – Sulton Uvays tog‘i',
    duration: '1 kun',
    price: '300 000 so‘m',
    description: 'Muqaddas ziyoratgoh va ajoyib tog‘ manzaralari. Sulton Uvays tog‘idagi maqbara va atrofdagi tabiat.',
    highlights: [
      'Sulton Uvays maqbarasi',
      'Tog‘ manzaralari',
      'Ziyorat',
      'Piknik'
    ],
    included: ['Transport', 'Gid', 'Suv', 'Tushlik'],
   images: [
  'https://images.openai.com/static-rsc-1/Nhsf1euw0m7wALm7uOTA3a6asjjsW2GRH7N2JL5lIUuzHqlJZcQfycGxqx5HvmPC4140ku9UKIlWoPWi3KYKcEGZ9-0I1WJH_7FH73tquS87-I3Wr7_lAFAOEUzdYAUQBYG5jMwSau7qtv0UDlrcfg?w=800',
  'https://images.openai.com/static-rsc-3/DwHt6TDxfmuAE8bq40UZOCz4FubfU_gsoJSF64BjBA4E9RDPpYrIqKkuQFOjf9qBHLy4QDYyw0OGGG8DmtepeVXTZTtvSRphZf5M939DtPE?purpose=fullsize&v=1?w=800',
  'https://images.openai.com/static-rsc-3/0DF01w2iC-JDIBK38BftGBF2V-qp6U0wnfXvszT8fOeEniX4s0LBF0oL94NVnkWeJPih0KR7mCzaj7rEwxWrMbIWb3f4MAnuE3_ckg-CA0w?purpose=fullsize&v=1?w=800'
]
,
    icon: Mountain,
    gradient: 'from-stone-500 to-zinc-500'
  },
  {
    id: 'dauitOta',
    title: 'Dauit Ota Ziyoratgohi',
    shortTitle: 'Dauit Ota',
    route: 'Qo‘ng‘irot – Dauit Ota',
    duration: 'Yarim kun',
    price: '180 000 so‘m',
    description: 'Tinch va osoyishta ziyoratgoh, dam olish uchun ideal maskan. Chashma va qadimiy chiroqlar.',
    highlights: [
      'Dauit Ota maqbarasi',
      'Muqaddas chashma',
      'Dam olish hududi',
      'Foto va video'
    ],
    included: ['Transport', 'Gid', 'Suv'],
   images: [
  'https://www.arianatours.uz/uploads/0000/6/2024/06/01/3.jpg?w=800',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/01/32/d0/caption.jpg?h=-1&s=1&w=1200?w=800',
  'https://people-travels.com/storage/images/uzbekistan-nature-reserves/kyzylkum-reserve.jpg?w=800'
]
,
    icon: Globe,
    gradient: 'from-lime-500 to-green-500'
  }
]

const companyStats = [
  { value: '15+', labelUz: 'Yillik tajriba', labelKaa: 'Jıllıq tájiriybe', icon: Star },
  { value: '5000+', labelUz: 'Mamnun mijozlar', labelKaa: 'Qanaatlanǵan mijozlar', icon: Users },
  { value: '20+', labelUz: 'Ekskursiya turlari', labelKaa: 'Ekskursiya túrleri', icon: Compass },
  { value: '100%', labelUz: 'Sifat kafolati', labelKaa: 'Sap kafiyatı', icon: Shield },
]

const advantages = [
  {
    icon: Car,
    titleUz: 'Qulay transport',
    titleKaa: 'Qolay transport',
    descUz: 'Zamonaviy mikroavtobuslar, konditsioner va qulay o‘rindiqlar',
    descKaa: 'Zamanagóy mikroavtobuslar, konditsioner hám qolay orınlıqlar',
    gradient: 'from-violet-500 to-fuchsia-500'
  },
  {
    icon: Languages,
    titleUz: 'Tajribali gidlar',
    titleKaa: 'Tájiriybeli gidler',
    descUz: '10 yillik tajribaga ega professional gidlar. 3 tilda bepul ekskursiya',
    descKaa: '10 jıllıq tájiriybeye iye professional gidler. 3 tilda biypul ekskursiya',
    gradient: 'from-fuchsia-500 to-pink-500'
  },
  {
    icon: Coffee,
    titleUz: 'Milliy taomlar',
    titleKaa: 'Milliy taomlar',
    descUz: 'Ekskursiya davomida milliy taomlardan tushlik. Vegetarian menyu mavjud',
    descKaa: 'Ekskursiya dawamında milliy taomlardan túsli. Vegetarian menyu bar',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: Camera,
    titleUz: 'Foto va video',
    titleKaa: 'Foto hám video',
    descUz: 'Professional fotograf xizmati. Barcha suratlar tekin',
    descKaa: 'Professional fotograf xızmeti. Barlıq súwretler biypul',
    gradient: 'from-rose-500 to-orange-500'
  },
  {
    icon: Shield,
    titleUz: 'Sug‘urta',
    titleKaa: 'Sıǵırta',
    descUz: 'Har bir sayyoh ekskursiya davomida sug‘urta qilinadi',
    descKaa: 'Hár bir sayaxatshı ekskursiya dawamında sıǵırta qılınadı',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    icon: Star,
    titleUz: 'Bonuslar',
    titleKaa: 'Bonuslar',
    descUz: 'Doimiy mijozlarga chegirmalar va bonuslar. Guruh bilan kelganlarga maxsus takliflar',
    descKaa: 'Dawamlı mijozlarǵa shegirmeler hám bonuslar. Top penen kelgenlerge arnawlı usınıslar',
    gradient: 'from-amber-500 to-yellow-500'
  }
]

const translations = {
  uz: {
    brandSub: 'Qo‘ng‘irot ekskursiya markazi',
    nav: {
      tours: 'Ekskursiyalar',
      advantages: 'Afzalliklar',
      contact: 'Aloqa'
    },
    hero: {
      badge: 'QO‘NG‘IROT EKSKURSIYA MARKAZI',
      title1: 'Orolbo‘yi',
      title2: 'sirli olamiga',
      title3: 'sayohat',
      desc: 'Xivaning qadimiy ko‘chalarida kezish, Orol dengizi qoldiqlarini ko‘rish va muqaddas ziyoratgohlarni ziyorat qilish — bularning barchasi sizni kutmoqda.',
      cta1: 'Ekskursiyalarni ko‘rish',
      cta2: 'Bog‘lanish'
    },
    filters: {
      all: 'Barcha turlar',
      historical: 'Tarixiy',
      nature: 'Tabiat'
    },
    tours: {
      title: 'Ekskursiya turlari',
      subtitle: 'Siz uchun eng qiziqarli va unutilmas sayohatlarni tanladik',
      details: 'Batafsil ma\'lumot'
    },
    advantages: {
      title: 'Nega aynan biz?',
      subtitle: 'Sizning qulayligingiz va xavfsizligingiz uchun barcha sharoitlar yaratilgan'
    },
    contact: {
      title: 'Bog‘lanish uchun',
      desc: 'Savollaringiz bo‘lsa yoki ekskursiyani bron qilmoqchi bo‘lsangiz, biz bilan bog‘laning. Tez orada siz bilan aloqaga chiqamiz.',
      phone: 'Telefon',
      telegram: 'Telegram',
      address: 'Manzil',
      form: {
        title: 'Tez bog‘lanish',
        name: 'Ismingiz',
        phone: 'Telefon raqamingiz',
        message: 'Xabaringiz',
        submit: 'Yuborish'
      }
    },
    footer: {
      about: 'Qo‘ng‘irot ekskursiya markazi. Biz bilan Orolbo‘yi sirli olamini kashf eting.',
      tours: 'Ekskursiyalar',
      info: 'Ma\'lumot',
      social: 'Ijtimoiy tarmoqlar',
      copyright: 'Barcha huquqlar himoyalangan.'
    },
    modal: {
      program: 'Dasturga kiritilgan',
      included: 'Narxga kiritilgan',
      duration: 'Davomiyligi',
      price: 'Narxi',
      book: 'Bron qilish'
    }
  },
  kaa: {
    brandSub: 'Qońırat ekskursiya orayı',
    nav: {
      tours: 'Ekskursiyalar',
      advantages: 'Abzallıqlar',
      contact: 'Baylanıs'
    },
    hero: {
      badge: 'QOŃIRAT EKSKURSIYA ORAYI',
      title1: 'Aralboyı',
      title2: 'sırlı álemine',
      title3: 'sayaxat',
      desc: 'Xivanıń qádiriy kóshelerinde keziw, Aral teńizi qaldıqların kóriw hám qásiyetli ziyaratgohlardı ziyarat qılıw — bularnıń barlıǵı sizdi kútip tur.',
      cta1: 'Ekskursiyalardı kóriw',
      cta2: 'Baylanısıw'
    },
    filters: {
      all: 'Barlıq túrler',
      historical: 'Tariyxıy',
      nature: 'Tábiyat'
    },
    tours: {
      title: 'Ekskursiya túrleri',
      subtitle: 'Siz ushın eń qızıqlı hám unutılmas sayaxatlardı tańladıq',
      details: 'Tolıq maǵlıwmat'
    },
    advantages: {
      title: 'Nega aynan biz?',
      subtitle: 'Siziń qolaylıǵıńız hám qawipsizligińiz ushın barlıq jaǵdaylar jaratılǵan'
    },
    contact: {
      title: 'Baylanıs ushın',
      desc: 'Sorawlarıńız bolsa yamasa ekskursiyanı bron qılmaqshı bolsańız, biz benen baylanısıń. Tez arada siz benen baylanısqa shıǵamız.',
      phone: 'Telefon',
      telegram: 'Telegram',
      address: 'Mánzil',
      form: {
        title: 'Tez baylanıs',
        name: 'Atıńız',
        phone: 'Telefon nomerińiz',
        message: 'Xabarıńız',
        submit: 'Jiberiw'
      }
    },
    footer: {
      about: 'Qońırat ekskursiya orayı. Biz benen Aralboyı sırlı álemin ashıń.',
      tours: 'Ekskursiyalar',
      info: 'Maǵlıwmat',
      social: 'Social tarmaqlar',
      copyright: 'Barlıq huqıqlar qorǵalǵan.'
    },
    modal: {
      program: 'Dásturǵa kirgizilgen',
      included: 'Narxqa kirgizilgen',
      duration: 'Dawamlılıǵı',
      price: 'Narıq',
      book: 'Bron qılıw'
    }
  }
}

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [lang, setLang] = useState<Lang>('uz')
  const [selectedExcursion, setSelectedExcursion] = useState<ExcursionKey | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<ExcursionKey, number>>(
    excursions.reduce((acc, ex) => ({ ...acc, [ex.id]: 0 }), {} as Record<ExcursionKey, number>)
  )
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const t = translations[lang]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (!selectedExcursion) return
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => ({
        ...prev,
        [selectedExcursion]: (prev[selectedExcursion] + 1) % excursions.find(e => e.id === selectedExcursion)!.images.length
      }))
    }, 4000)
    return () => clearInterval(interval)
  }, [selectedExcursion])

  const selectedData = useMemo(
    () => excursions.find(e => e.id === selectedExcursion),
    [selectedExcursion]
  )

  const filteredExcursions = useMemo(() => {
    if (activeFilter === 'all') return excursions
    if (activeFilter === 'historical') return excursions.filter(ex => ex.id === 'khiva' || ex.id === 'mazlumxon')
    if (activeFilter === 'nature') return excursions.filter(ex => ex.id === 'moynaq' || ex.id === 'sultonUvays' || ex.id === 'dauitOta')
    return excursions
  }, [activeFilter])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Декоративный фон */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-violet-100/30 via-fuchsia-100/30 to-cyan-100/30"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        />
        <div className="absolute top-20 left-20 w-72 h-72 bg-violet-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-fuchsia-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Шапка */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Логотип */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl blur-lg opacity-70" />
                <div className="relative w-12 h-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                  <Compass className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Atabek Traveling
                </h1>
                <p className="text-sm text-slate-500">{t.brandSub}</p>
              </div>
            </motion.div>

            {/* Навигация и язык */}
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6">
                <a href="#tours" className="text-slate-600 hover:text-violet-600 transition flex items-center gap-1">
                  <MapPinned size={18} />
                  {t.nav.tours}
                </a>
                <a href="#advantages" className="text-slate-600 hover:text-violet-600 transition flex items-center gap-1">
                  <Star size={18} />
                  {t.nav.advantages}
                </a>
                <a href="#contact" className="text-slate-600 hover:text-violet-600 transition flex items-center gap-1">
                  <Phone size={18} />
                  {t.nav.contact}
                </a>
              </nav>

              {/* Переключатель языка */}
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
                  ҚАРАҚАЛПАҚ
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero секция */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Левый контент */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full text-sm font-medium text-violet-700 mb-8">
                <Compass size={16} />
                {t.hero.badge}
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
                  {t.hero.title1}
                </span>
                <br />
                <span className="text-slate-800">{t.hero.title2}</span>
                <br />
                <span className="text-slate-800">{t.hero.title3}</span>
              </h2>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t.hero.desc}
              </p>

              {/* Статистика */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {companyStats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-xl text-violet-600 mb-2">
                        <Icon size={24} />
                      </div>
                      <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                      <div className="text-xs text-slate-500">{lang === 'uz' ? stat.labelUz : stat.labelKaa}</div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Кнопки */}
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#tours"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-semibold shadow-lg shadow-violet-200 flex items-center gap-2"
                >
                  {t.hero.cta1}
                  <ChevronRight size={20} />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold shadow-lg border border-slate-200 flex items-center gap-2"
                >
                  <Phone size={20} />
                  {t.hero.cta2}
                </motion.a>
              </div>
            </motion.div>

            {/* Правая часть с изображениями */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                    <img 
                      src={excursions[0].images[0]} 
                      alt="Xiva"
                      className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white flex items-center gap-1">
                      <Landmark size={16} />
                      <span className="text-sm font-medium">Xiva</span>
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                    <img 
                      src={excursions[1].images[0]} 
                      alt="Mo‘ynoq"
                      className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white flex items-center gap-1">
                      <Ship size={16} />
                      <span className="text-sm font-medium">Mo‘ynoq</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                    <img 
                      src={excursions[3].images[0]} 
                      alt="Sulton Uvays"
                      className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white flex items-center gap-1">
                      <Mountain size={16} />
                      <span className="text-sm font-medium">Sulton Uvays</span>
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                    <img 
                      src={excursions[4].images[0]} 
                      alt="Dauit Ota"
                      className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white flex items-center gap-1">
                      <Globe size={16} />
                      <span className="text-sm font-medium">Dauit Ota</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Фильтры */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { id: 'all', label: t.filters.all, icon: Compass },
              { id: 'historical', label: t.filters.historical, icon: Landmark },
              { id: 'nature', label: t.filters.nature, icon: Mountain },
            ].map((filter) => {
              const Icon = filter.icon
              return (
                <motion.button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-200'
                      : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm'
                  }`}
                >
                  <Icon size={18} />
                  {filter.label}
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Экскурсии */}
      <section id="tours" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                {t.tours.title}
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t.tours.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredExcursions.map((excursion, index) => {
                const Icon = excursion.icon
                return (
                  <motion.div
                    key={excursion.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedExcursion(excursion.id)}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer group border border-slate-100"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={excursion.images[0]} 
                        alt={excursion.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${excursion.gradient} opacity-60 mix-blend-overlay`} />
                      
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-slate-700 shadow-lg flex items-center gap-1">
                          <Clock size={14} />
                          {excursion.duration}
                        </span>
                      </div>
                      
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                          <Icon className="w-6 h-6 text-violet-600" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{excursion.title}</h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{excursion.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPinned size={16} className="text-violet-500" />
                          {excursion.route}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <CircleDollarSign size={16} className="text-violet-500" />
                          <span className="font-semibold text-violet-600">{excursion.price}</span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-3 bg-gradient-to-r ${excursion.gradient} text-white rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg flex items-center justify-center gap-2`}
                      >
                        {t.tours.details}
                        <ChevronRight size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section id="advantages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                {t.advantages.title}
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t.advantages.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${advantage.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500`} />
                  
                  <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-slate-100 group-hover:border-transparent transition">
                    <div className={`w-16 h-16 bg-gradient-to-r ${advantage.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-violet-600 transition">
                      {lang === 'uz' ? advantage.titleUz : advantage.titleKaa}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed">
                      {lang === 'uz' ? advantage.descUz : advantage.descKaa}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-600 rounded-3xl p-12 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-bold mb-4">{t.contact.title}</h3>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  {t.contact.desc}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{t.contact.phone}</p>
                      <p className="text-xl font-semibold">+998 90 660 50 07</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition">
                      <Send size={24} />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{t.contact.telegram}</p>
                      <p className="text-xl font-semibold">@atabek_nazarov571</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{t.contact.address}</p>
                      <p className="text-xl font-semibold">Qo‘ng‘irot shahri, Markaziy ko‘cha 15</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Форма */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h4 className="text-2xl font-semibold mb-6">{t.contact.form.title}</h4>
                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder={t.contact.form.name} 
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <input 
                    type="tel" 
                    placeholder={t.contact.form.phone} 
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <textarea 
                    placeholder={t.contact.form.message} 
                    rows={3}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-white text-violet-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    {t.contact.form.submit}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-semibold">Atabek Traveling</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.footer.about}
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-white">{t.footer.tours}</h5>
              <ul className="space-y-3">
                {excursions.map(ex => {
                  const Icon = ex.icon
                  return (
                    <li key={ex.id}>
                      <button 
                        onClick={() => setSelectedExcursion(ex.id)}
                        className="text-slate-400 hover:text-violet-400 transition flex items-center gap-2"
                      >
                        <Icon size={16} />
                        {ex.shortTitle}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-white">{t.footer.info}</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-violet-400 transition flex items-center gap-2"><Users size={16} /> {lang === 'uz' ? 'Biz haqimizda' : 'Biz haqqımızda'}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-violet-400 transition flex items-center gap-2"><Handshake size={16} /> {lang === 'uz' ? 'Hamkorlarga' : 'Áripteslerge'}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-violet-400 transition flex items-center gap-2"><Camera size={16} /> {lang === 'uz' ? 'Foto galereya' : 'Foto galereya'}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-violet-400 transition flex items-center gap-2"><MessagesSquare size={16} /> {lang === 'uz' ? 'Blog' : 'Blog'}</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-white">{t.footer.social}</h5>
              <div className="flex gap-3">
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-violet-600 transition">📘</a>
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-fuchsia-600 transition">📷</a>
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-cyan-600 transition">🎥</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
            © 2024 Atabek Traveling. {t.footer.copyright}
          </div>
        </div>
      </footer>

      {/* Модальное окно с деталями тура */}
      <AnimatePresence>
        {selectedExcursion && selectedData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedExcursion(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative h-96">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex[selectedExcursion]}
                    src={selectedData.images[currentImageIndex[selectedExcursion]]}
                    alt={selectedData.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {selectedData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(prev => ({ ...prev, [selectedExcursion]: index }))}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex[selectedExcursion]
                          ? 'w-8 bg-white'
                          : 'w-2 bg-white/50 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setSelectedExcursion(null)}
                  className="absolute top-6 right-6 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition"
                >
                  <X size={24} />
                </button>

                <div className="absolute top-6 left-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                  {selectedData.icon && <selectedData.icon className="w-8 h-8 text-violet-600" />}
                </div>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">{selectedData.title}</h3>
                  <p className="text-slate-500 flex items-center gap-2">
                    <MapPinned size={18} />
                    {selectedData.route}
                  </p>
                </div>

                <p className="text-lg text-slate-600 mb-8 leading-relaxed">{selectedData.description}</p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-violet-500 rounded-full" />
                      {t.modal.program}
                    </h4>
                    <ul className="space-y-3">
                      {selectedData.highlights.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-slate-600">
                          <CheckCircle2 size={18} className="text-violet-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-fuchsia-500 rounded-full" />
                      {t.modal.included}
                    </h4>
                    <ul className="space-y-3">
                      {selectedData.included.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-slate-600">
                          <CheckCircle2 size={18} className="text-fuchsia-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-xl mb-6">
                  <div>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Clock size={16} />
                      {t.modal.duration}
                    </p>
                    <p className="text-2xl font-bold text-slate-800">{selectedData.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <CircleDollarSign size={16} />
                      {t.modal.price}
                    </p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                      {selectedData.price}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-4 bg-gradient-to-r ${selectedData.gradient} text-white rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2`}
                  >
                    <CalendarCheck2 size={20} />
                    {t.modal.book}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-4 bg-slate-100 text-slate-700 rounded-xl font-semibold text-lg hover:bg-slate-200 transition"
                  >
                    <Phone size={20} />
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