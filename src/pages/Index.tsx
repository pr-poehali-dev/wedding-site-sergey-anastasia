import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const WEDDING_DATE = new Date('2026-08-07T12:40:00');

const HERO_BG = 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/f9af8c59-01ca-4226-a385-b687fab52664.jpg';
const COUPLE_IMG = 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/f09bf319-dfd4-444a-a1c3-d01ae5fc3c9a.jpg';

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}

function Petals() {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 8.3) % 100}%`,
    delay: `${(i * 0.7) % 8}s`,
    duration: `${6 + (i % 4) * 2}s`,
    size: `${12 + (i % 3) * 4}px`,
    emoji: i % 2 === 0 ? '🌹' : '🌿',
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map(p => (
        <span key={p.id} style={{
          position: 'absolute', left: p.left, top: '-20px',
          fontSize: p.size, animationDelay: p.delay, animationDuration: p.duration,
          animation: `petal-fall ${p.duration} ${p.delay} linear infinite`,
          opacity: 0.5,
        }}>{p.emoji}</span>
      ))}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    { href: '#hero', label: 'Главная' },
    { href: '#schedule', label: 'График дня' },
    { href: '#venue', label: 'Место' },
    { href: '#gallery', label: 'Галерея' },
    { href: '#rsvp', label: 'Я приду!' },
    { href: '#contacts', label: 'Контакты' },
  ];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-wedding-green-dark/95 backdrop-blur-md shadow-xl py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <span className="font-cormorant text-wedding-gold text-xl font-light tracking-widest">С & А</span>
        <ul className="hidden md:flex gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="font-montserrat text-xs tracking-widest uppercase text-white/80 hover:text-wedding-gold transition-colors duration-300">{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-wedding-green-dark/70 via-wedding-green-dark/50 to-wedding-green-dark/80" />
      </div>

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <p className="font-montserrat text-xs md:text-sm tracking-[0.4em] uppercase text-wedding-gold mb-6 animate-fade-in">
          07 августа 2026
        </p>

        <div className="animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <h1 className="font-cormorant text-6xl md:text-8xl lg:text-9xl text-white font-light leading-none mb-2">
            Сергей
          </h1>
          <div className="flex items-center justify-center gap-4 my-3">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-wedding-gold" />
            <span className="text-wedding-gold text-2xl font-cormorant italic">&</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-wedding-gold" />
          </div>
          <h1 className="font-cormorant text-6xl md:text-8xl lg:text-9xl text-white font-light leading-none">
            Анастасия
          </h1>
        </div>

        <div className="mt-8 animate-fade-up" style={{ animationDelay: '0.7s', opacity: 0 }}>
          <p className="font-cormorant italic text-xl md:text-2xl text-white/80 mb-10">
            Мы приглашаем вас разделить с нами этот особенный день
          </p>
          <div className="flex justify-center gap-4 md:gap-8">
            {[
              { val: days, label: 'дней' },
              { val: hours, label: 'часов' },
              { val: minutes, label: 'минут' },
              { val: seconds, label: 'секунд' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm border border-wedding-gold/30 rounded-lg px-4 md:px-6 py-3 md:py-4 min-w-[70px] md:min-w-[90px]">
                  <div className="font-cormorant-sc text-3xl md:text-4xl text-wedding-gold font-medium">{String(val).padStart(2, '0')}</div>
                </div>
                <p className="font-montserrat text-[10px] tracking-widest uppercase text-white/60 mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 animate-fade-up" style={{ animationDelay: '1s', opacity: 0 }}>
          <a href="#rsvp" className="inline-block font-montserrat text-xs tracking-widest uppercase bg-wedding-red text-white px-10 py-4 hover:bg-wedding-red-dark transition-all duration-300 hover:shadow-lg hover:shadow-wedding-red/30 hover:-translate-y-0.5">
            Подтвердить присутствие
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-float">
        <Icon name="ChevronDown" size={24} className="text-wedding-gold opacity-70" />
      </div>

      <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
        <div className="w-full h-full border-t-2 border-l-2 border-wedding-gold" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
        <div className="w-full h-full border-b-2 border-r-2 border-wedding-gold" />
      </div>
    </section>
  );
}

function Schedule() {
  const items = [
    {
      time: '12:40',
      icon: '💍',
      title: 'Регистрация в ЗАГС',
      desc: 'Торжественная церемония бракосочетания. Скрепление нашего союза перед лицом государства.',
      side: 'left',
    },
    {
      time: '14:00 – 16:30',
      icon: '📸',
      title: 'Фотосессия',
      desc: 'Прогулка и создание воспоминаний на всю жизнь.',
      side: 'right',
    },
    {
      time: '17:00',
      icon: '🥂',
      title: 'Начало торжества',
      desc: 'Праздничный банкет, поздравления, танцы и веселье до утра!',
      side: 'left',
    },
  ];

  return (
    <section id="schedule" className="py-24 bg-wedding-ivory relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wedding-green via-wedding-gold to-wedding-red" />

      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-wedding-red mb-4">7 августа 2026</p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-wedding-green-dark font-light">
            График дня
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-wedding-gold" />
            <span className="text-wedding-gold">✦</span>
            <div className="h-px w-16 bg-wedding-gold" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-wedding-green via-wedding-gold to-wedding-red opacity-30 -translate-x-1/2 hidden md:block" />

          {items.map((item, i) => (
            <div key={i} className={`flex items-center gap-6 mb-12 flex-col md:flex-row ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
              <div className={`flex-1 w-full ${item.side === 'left' ? 'md:text-right' : 'md:text-left'}`}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-wedding-gold/10 hover:shadow-md hover:border-wedding-gold/30 transition-all duration-300">
                  <p className="font-cormorant-sc text-2xl text-wedding-gold font-medium mb-1">{item.time}</p>
                  <h3 className="font-cormorant text-2xl text-wedding-green-dark font-medium mb-2">{item.title}</h3>
                  <p className="font-montserrat text-sm text-gray-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
              <div className="relative z-10 flex-shrink-0 hidden md:flex">
                <div className="w-14 h-14 rounded-full bg-wedding-green-dark border-4 border-wedding-gold flex items-center justify-center text-2xl shadow-lg">
                  {item.icon}
                </div>
              </div>
              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section id="venue" className="py-24 bg-wedding-green-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #c9a84c 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-wedding-gold mb-4">Где нас найти</p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-white font-light">
            Место проведения
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-wedding-gold/50" />
            <span className="text-wedding-gold">✦</span>
            <div className="h-px w-16 bg-wedding-gold/50" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-wedding-gold/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-wedding-red/20 border border-wedding-red/40 flex items-center justify-center text-xl">💍</div>
              <div>
                <p className="font-montserrat text-xs tracking-widest uppercase text-wedding-gold">12:40</p>
                <h3 className="font-cormorant text-2xl text-white">Дворец бракосочетания</h3>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={16} className="text-wedding-gold mt-0.5 flex-shrink-0" />
                <p className="font-montserrat text-sm text-white/70 font-light">Уточните адрес у молодожёнов</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Clock" size={16} className="text-wedding-gold mt-0.5 flex-shrink-0" />
                <p className="font-montserrat text-sm text-white/70 font-light">Просим прибыть к 12:20</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-wedding-gold/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-wedding-green/20 border border-wedding-green/40 flex items-center justify-center text-xl">🥂</div>
              <div>
                <p className="font-montserrat text-xs tracking-widest uppercase text-wedding-gold">17:00</p>
                <h3 className="font-cormorant text-2xl text-white">Ресторан торжества</h3>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={16} className="text-wedding-gold mt-0.5 flex-shrink-0" />
                <p className="font-montserrat text-sm text-white/70 font-light">Уточните адрес у молодожёнов</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Clock" size={16} className="text-wedding-gold mt-0.5 flex-shrink-0" />
                <p className="font-montserrat text-sm text-white/70 font-light">Банкет, танцы и торжество</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl overflow-hidden border border-wedding-gold/20 h-64 bg-white/5 flex items-center justify-center">
          <div className="text-center">
            <Icon name="Map" size={48} className="text-wedding-gold/40 mx-auto mb-3" />
            <p className="font-montserrat text-sm text-white/40 tracking-wide">Карта будет добавлена после уточнения адресов</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const photos = [
    { src: COUPLE_IMG, cls: 'md:col-span-2 md:row-span-2' },
    { src: HERO_BG, cls: '' },
    { src: COUPLE_IMG, cls: '' },
    { src: HERO_BG, cls: 'md:col-span-2' },
  ];

  return (
    <section id="gallery" className="py-24 bg-wedding-cream">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-wedding-red mb-4">Наши моменты</p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-wedding-green-dark font-light">
            Фотогалерея
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-wedding-gold" />
            <span className="text-wedding-gold">✦</span>
            <div className="h-px w-16 bg-wedding-gold" />
          </div>
          <p className="font-cormorant italic text-xl text-gray-500 mt-4">Здесь будут ваши совместные фотографии</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {photos.map((p, i) => (
            <div key={i} className={`${p.cls} rounded-2xl overflow-hidden group cursor-pointer`}>
              <div className="relative w-full h-full">
                <img src={p.src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-wedding-green-dark/0 group-hover:bg-wedding-green-dark/30 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon name="ZoomIn" size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="font-montserrat text-sm text-gray-400">Все фотографии появятся после свадьбы ✨</p>
        </div>
      </div>
    </section>
  );
}

function RSVP() {
  const [form, setForm] = useState({ name: '', attending: 'yes', guests: '1', dietary: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
        <div className="w-full h-full rounded-full bg-wedding-red" style={{ transform: 'translate(50%, -50%)' }} />
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-5">
        <div className="w-full h-full rounded-full bg-wedding-green" style={{ transform: 'translate(-50%, 50%)' }} />
      </div>

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-wedding-red mb-4">Ждём вас!</p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-wedding-green-dark font-light">
            Подтверждение
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-wedding-gold" />
            <span className="text-wedding-gold">✦</span>
            <div className="h-px w-16 bg-wedding-gold" />
          </div>
          <p className="font-cormorant italic text-xl text-gray-500 mt-4">
            Пожалуйста, сообщите о своём присутствии до 1 июля 2026
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">💌</div>
            <h3 className="font-cormorant text-4xl text-wedding-green-dark mb-4">Спасибо!</h3>
            <p className="font-montserrat text-sm text-gray-500">Мы с нетерпением ждём встречи с вами</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-montserrat text-xs tracking-widest uppercase text-gray-500 mb-2">Ваше имя *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border-b-2 border-gray-200 focus:border-wedding-green outline-none py-3 font-cormorant text-xl text-gray-800 bg-transparent transition-colors duration-300"
                placeholder="Имя Фамилия"
              />
            </div>

            <div>
              <label className="block font-montserrat text-xs tracking-widest uppercase text-gray-500 mb-3">Вы придёте? *</label>
              <div className="flex gap-4">
                {[{ v: 'yes', l: '✓ Буду!' }, { v: 'no', l: '✗ Не смогу' }].map(({ v, l }) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setForm({ ...form, attending: v })}
                    className={`flex-1 py-3 font-montserrat text-sm tracking-wider border-2 transition-all duration-300 ${
                      form.attending === v
                        ? v === 'yes' ? 'bg-wedding-green text-white border-wedding-green' : 'bg-wedding-red text-white border-wedding-red'
                        : 'bg-transparent text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                  >{l}</button>
                ))}
              </div>
            </div>

            {form.attending === 'yes' && (
              <div>
                <label className="block font-montserrat text-xs tracking-widest uppercase text-gray-500 mb-2">Количество гостей</label>
                <select
                  value={form.guests}
                  onChange={e => setForm({ ...form, guests: e.target.value })}
                  className="w-full border-b-2 border-gray-200 focus:border-wedding-green outline-none py-3 font-cormorant text-xl text-gray-800 bg-transparent transition-colors duration-300"
                >
                  {['1', '2', '3', '4', '5+'].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            )}

            <div>
              <label className="block font-montserrat text-xs tracking-widest uppercase text-gray-500 mb-2">Пожелания к меню</label>
              <input
                type="text"
                value={form.dietary}
                onChange={e => setForm({ ...form, dietary: e.target.value })}
                className="w-full border-b-2 border-gray-200 focus:border-wedding-green outline-none py-3 font-cormorant text-xl text-gray-800 bg-transparent transition-colors duration-300"
                placeholder="Аллергии, предпочтения..."
              />
            </div>

            <div>
              <label className="block font-montserrat text-xs tracking-widest uppercase text-gray-500 mb-2">Пожелания молодожёнам</label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full border-b-2 border-gray-200 focus:border-wedding-green outline-none py-3 font-cormorant text-xl text-gray-800 bg-transparent transition-colors duration-300 resize-none"
                placeholder="Тёплые слова..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-wedding-green-dark text-white font-montserrat text-xs tracking-widest uppercase py-5 hover:bg-wedding-green transition-all duration-300 hover:shadow-lg hover:shadow-wedding-green/30 hover:-translate-y-0.5"
            >
              Отправить
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section id="contacts" className="py-24 bg-wedding-green-dark">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="mb-16">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-wedding-gold mb-4">Есть вопросы?</p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-white font-light">Контакты</h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-wedding-gold/50" />
            <span className="text-wedding-gold">✦</span>
            <div className="h-px w-16 bg-wedding-gold/50" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 border border-wedding-gold/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-wedding-red/20 border border-wedding-red/40 flex items-center justify-center text-2xl mx-auto mb-4">🤵</div>
            <h3 className="font-cormorant text-2xl text-white mb-1">Сергей</h3>
            <p className="font-montserrat text-xs tracking-wider uppercase text-wedding-gold mb-4">Жених</p>
            <a href="tel:+7XXXXXXXXXX" className="flex items-center justify-center gap-2 font-montserrat text-sm text-white/70 hover:text-wedding-gold transition-colors">
              <Icon name="Phone" size={14} />
              +7 (XXX) XXX-XX-XX
            </a>
          </div>

          <div className="bg-white/5 border border-wedding-gold/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-wedding-green/20 border border-wedding-green/40 flex items-center justify-center text-2xl mx-auto mb-4">👰</div>
            <h3 className="font-cormorant text-2xl text-white mb-1">Анастасия</h3>
            <p className="font-montserrat text-xs tracking-wider uppercase text-wedding-gold mb-4">Невеста</p>
            <a href="tel:+7XXXXXXXXXX" className="flex items-center justify-center gap-2 font-montserrat text-sm text-white/70 hover:text-wedding-gold transition-colors">
              <Icon name="Phone" size={14} />
              +7 (XXX) XXX-XX-XX
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10">
          <p className="font-cormorant italic text-2xl text-white/60 mb-2">
            «Любовь никогда не перестаёт»
          </p>
          <p className="font-montserrat text-xs tracking-widest uppercase text-wedding-gold/60">07 · 08 · 2026</p>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-wedding-cream">
      <Petals />
      <Nav />
      <Hero />
      <Schedule />
      <Venue />
      <Gallery />
      <RSVP />
      <Contacts />
    </div>
  );
}
