import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const WEDDING_DATE = new Date('2026-08-07T12:40:00');
const COUPLE_IMG = 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/f09bf319-dfd4-444a-a1c3-d01ae5fc3c9a.jpg';
const CORNER_IMG = 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/72b4b4f0-70cc-4c56-9b02-1da351f78dc1.jpg';
const DIVIDER_IMG = 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/1ef5b17a-8c49-41c8-884b-9171a7078c3a.jpg';

function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setT({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function CornerDecor({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const classes: Record<string, string> = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0 scale-x-[-1]',
    bl: 'bottom-0 left-0 scale-y-[-1]',
    br: 'bottom-0 right-0 scale-[-1]',
  };
  return (
    <img
      src={CORNER_IMG}
      alt=""
      className={`absolute w-36 md:w-48 opacity-80 pointer-events-none select-none ${classes[pos]}`}
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center py-2">
      <img src={DIVIDER_IMG} alt="" className="w-64 md:w-96 opacity-80" style={{ mixBlendMode: 'multiply' }} />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [
    { href: '#hero', label: 'Главная' },
    { href: '#schedule', label: 'День' },
    { href: '#venue', label: 'Место' },
    { href: '#gallery', label: 'Галерея' },
    { href: '#rsvp', label: 'Я приду' },
    { href: '#contacts', label: 'Контакты' },
  ];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-stone-100' : 'bg-transparent py-5'}`}>
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <span className="font-cormorant text-stone-800 text-lg font-light tracking-[0.3em] italic">С & А</span>
        <ul className="hidden md:flex gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="font-montserrat text-[11px] tracking-[0.25em] uppercase text-stone-500 hover:text-red-700 transition-colors duration-300">{l.label}</a>
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-[#faf8f5] overflow-hidden">
      <CornerDecor pos="tl" />
      <CornerDecor pos="tr" />
      <CornerDecor pos="bl" />
      <CornerDecor pos="br" />

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <p className="font-montserrat text-[11px] tracking-[0.45em] uppercase text-stone-400 mb-10 animate-fade-in">
          07 · 08 · 2026
        </p>

        <div className="animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <h1 className="font-cormorant text-7xl md:text-8xl text-stone-800 font-light leading-none tracking-wide">
            Сергей
          </h1>
          <div className="flex items-center justify-center gap-5 my-5">
            <div className="h-px flex-1 max-w-[80px] bg-red-300/60" />
            <span className="font-cormorant italic text-3xl text-red-400">&</span>
            <div className="h-px flex-1 max-w-[80px] bg-red-300/60" />
          </div>
          <h1 className="font-cormorant text-7xl md:text-8xl text-stone-800 font-light leading-none tracking-wide">
            Анастасия
          </h1>
        </div>

        <p className="font-cormorant italic text-xl text-stone-400 mt-8 mb-12 animate-fade-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
          Мы приглашаем вас разделить с нами этот особенный день
        </p>

        <div className="flex justify-center gap-4 md:gap-6 mb-12 animate-fade-up" style={{ animationDelay: '0.8s', opacity: 0 }}>
          {[{ val: days, label: 'дней' }, { val: hours, label: 'часов' }, { val: minutes, label: 'минут' }, { val: seconds, label: 'секунд' }].map(({ val, label }) => (
            <div key={label} className="text-center">
              <div className="border border-stone-200 bg-white px-4 md:px-5 py-3 min-w-[64px] md:min-w-[76px] rounded-sm">
                <div className="font-cormorant text-3xl md:text-4xl text-stone-800 font-light">{String(val).padStart(2, '0')}</div>
              </div>
              <p className="font-montserrat text-[9px] tracking-[0.25em] uppercase text-stone-400 mt-2">{label}</p>
            </div>
          ))}
        </div>

        <a href="#rsvp" className="inline-block font-montserrat text-[11px] tracking-[0.3em] uppercase text-white bg-red-700 px-10 py-4 hover:bg-red-800 transition-colors duration-300 animate-fade-up" style={{ animationDelay: '1s', opacity: 0 }}>
          Подтвердить присутствие
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <Icon name="ChevronDown" size={18} className="text-stone-300" />
      </div>
    </section>
  );
}

function Schedule() {
  const items = [
    { time: '12:40', icon: '💍', title: 'Регистрация в ЗАГС', desc: 'Торжественная церемония бракосочетания. Просим прибыть к 12:20.' },
    { time: '14:00', icon: '📸', title: 'Фотосессия', desc: 'Прогулка и создание воспоминаний на всю жизнь.' },
    { time: '17:00', icon: '🥂', title: 'Начало торжества', desc: 'Праздничный банкет, поздравления, танцы и веселье!' },
  ];
  return (
    <section id="schedule" className="py-24 bg-white relative overflow-hidden">
      <CornerDecor pos="tl" />
      <CornerDecor pos="br" />

      <div className="max-w-xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="font-montserrat text-[10px] tracking-[0.45em] uppercase text-red-400 mb-3">7 августа 2026</p>
          <h2 className="font-cormorant text-5xl text-stone-800 font-light">График дня</h2>
          <Divider />
        </div>

        <div className="space-y-0">
          {items.map((item, i) => (
            <div key={i}>
              <div className="flex gap-6 py-8">
                <div className="text-right w-20 flex-shrink-0 pt-1">
                  <span className="font-cormorant text-2xl text-red-600 font-light">{item.time}</span>
                </div>
                <div className="w-px bg-stone-200 flex-shrink-0 relative">
                  <div className="absolute top-1 -left-[7px] w-3.5 h-3.5 rounded-full border-2 border-red-400 bg-white" />
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{item.icon}</span>
                    <h3 className="font-cormorant text-2xl text-stone-800 font-medium">{item.title}</h3>
                  </div>
                  <p className="font-montserrat text-sm text-stone-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
              {i < items.length - 1 && <div className="h-px bg-stone-100 mx-4" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section id="venue" className="py-24 bg-[#faf8f5] relative overflow-hidden">
      <CornerDecor pos="tr" />
      <CornerDecor pos="bl" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="font-montserrat text-[10px] tracking-[0.45em] uppercase text-red-400 mb-3">Где нас найти</p>
          <h2 className="font-cormorant text-5xl text-stone-800 font-light">Место проведения</h2>
          <Divider />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-stone-100 rounded-sm p-8 hover:border-red-200 transition-colors duration-300">
            <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-red-400 mb-3">12:40</p>
            <h3 className="font-cormorant text-3xl text-stone-800 font-light mb-4">Дворец бракосочетания</h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="font-montserrat text-sm text-stone-500 font-light">г. Курган, ул. Рихарда Зорге, 48</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Clock" size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="font-montserrat text-sm text-stone-500 font-light">Просим прибыть к 12:20</p>
              </div>
            </div>
            <a href="https://yandex.ru/maps/?text=Курган,+улица+Рихарда+Зорге,+48" target="_blank" rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 font-montserrat text-[10px] tracking-[0.3em] uppercase text-red-500 hover:text-red-700 transition-colors">
              <Icon name="Navigation" size={12} /> Построить маршрут
            </a>
          </div>

          <div className="bg-white border border-stone-100 rounded-sm p-8 hover:border-red-200 transition-colors duration-300">
            <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-red-400 mb-3">17:00</p>
            <h3 className="font-cormorant text-3xl text-stone-800 font-light mb-4">Кафе «Август»</h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="font-montserrat text-sm text-stone-500 font-light">р.п. Варгаши, Комсомольская ул., 31</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Clock" size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="font-montserrat text-sm text-stone-500 font-light">Банкет, танцы и торжество</p>
              </div>
            </div>
            <a href="https://yandex.ru/maps/?text=Варгаши,+Комсомольская+улица,+31" target="_blank" rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 font-montserrat text-[10px] tracking-[0.3em] uppercase text-red-500 hover:text-red-700 transition-colors">
              <Icon name="Navigation" size={12} /> Построить маршрут
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-sm overflow-hidden border border-stone-100 h-52">
            <iframe title="ЗАГС" src="https://yandex.ru/map-widget/v1/?text=Курган%2C+улица+Рихарда+Зорге%2C+48&z=16&l=map" width="100%" height="100%" frameBorder="0" allowFullScreen style={{ border: 0 }} />
          </div>
          <div className="rounded-sm overflow-hidden border border-stone-100 h-52">
            <iframe title="Кафе Август" src="https://yandex.ru/map-widget/v1/?text=Варгаши%2C+Комсомольская+улица%2C+31&z=16&l=map" width="100%" height="100%" frameBorder="0" allowFullScreen style={{ border: 0 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const photos = [
    { src: COUPLE_IMG, cls: 'md:col-span-2 md:row-span-2' },
    { src: 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/f9af8c59-01ca-4226-a385-b687fab52664.jpg', cls: '' },
    { src: COUPLE_IMG, cls: '' },
    { src: 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/f9af8c59-01ca-4226-a385-b687fab52664.jpg', cls: 'md:col-span-2' },
  ];
  return (
    <section id="gallery" className="py-24 bg-white relative overflow-hidden">
      <CornerDecor pos="tl" />
      <CornerDecor pos="br" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="font-montserrat text-[10px] tracking-[0.45em] uppercase text-red-400 mb-3">Наши моменты</p>
          <h2 className="font-cormorant text-5xl text-stone-800 font-light">Фотогалерея</h2>
          <Divider />
          <p className="font-cormorant italic text-lg text-stone-400 -mt-2">Здесь появятся ваши совместные фотографии</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[180px]">
          {photos.map((p, i) => (
            <div key={i} className={`${p.cls} overflow-hidden group cursor-pointer rounded-sm`}>
              <div className="relative w-full h-full">
                <img src={p.src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
        <p className="font-montserrat text-[11px] tracking-widest uppercase text-stone-300 text-center mt-6">Все фотографии появятся после свадьбы</p>
      </div>
    </section>
  );
}

function RSVP() {
  const [form, setForm] = useState({ name: '', attending: 'yes', guests: '1', dietary: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="rsvp" className="py-24 bg-[#faf8f5] relative overflow-hidden">
      <CornerDecor pos="tr" />
      <CornerDecor pos="bl" />

      <div className="max-w-lg mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="font-montserrat text-[10px] tracking-[0.45em] uppercase text-red-400 mb-3">Ждём вас!</p>
          <h2 className="font-cormorant text-5xl text-stone-800 font-light">Подтверждение</h2>
          <Divider />
          <p className="font-cormorant italic text-lg text-stone-400 -mt-2">Сообщите о присутствии до 1 июля 2026</p>
        </div>

        {submitted ? (
          <div className="text-center py-12">
            <img src={CORNER_IMG} alt="" className="w-32 mx-auto mb-6 opacity-70" style={{ mixBlendMode: 'multiply' }} />
            <h3 className="font-cormorant text-4xl text-stone-800 mb-3">Спасибо!</h3>
            <p className="font-montserrat text-sm text-stone-400">Мы с нетерпением ждём встречи с вами</p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-7">
            <div>
              <label className="block font-montserrat text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-2">Ваше имя *</label>
              <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border-b border-stone-200 focus:border-red-400 outline-none py-2.5 font-cormorant text-xl text-stone-800 bg-transparent transition-colors placeholder:text-stone-300"
                placeholder="Имя Фамилия" />
            </div>

            <div>
              <label className="block font-montserrat text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-3">Вы придёте? *</label>
              <div className="flex gap-3">
                {[{ v: 'yes', l: 'Буду!' }, { v: 'no', l: 'Не смогу' }].map(({ v, l }) => (
                  <button key={v} type="button" onClick={() => setForm({ ...form, attending: v })}
                    className={`flex-1 py-3 font-montserrat text-[11px] tracking-[0.2em] uppercase border transition-all duration-300 ${
                      form.attending === v
                        ? v === 'yes' ? 'bg-red-700 text-white border-red-700' : 'bg-stone-700 text-white border-stone-700'
                        : 'bg-transparent text-stone-500 border-stone-200 hover:border-stone-400'
                    }`}>{l}</button>
                ))}
              </div>
            </div>

            {form.attending === 'yes' && (
              <div>
                <label className="block font-montserrat text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-2">Количество гостей</label>
                <select value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })}
                  className="w-full border-b border-stone-200 focus:border-red-400 outline-none py-2.5 font-cormorant text-xl text-stone-800 bg-transparent">
                  {['1', '2', '3', '4', '5+'].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            )}

            <div>
              <label className="block font-montserrat text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-2">Пожелания к меню</label>
              <input type="text" value={form.dietary} onChange={e => setForm({ ...form, dietary: e.target.value })}
                className="w-full border-b border-stone-200 focus:border-red-400 outline-none py-2.5 font-cormorant text-xl text-stone-800 bg-transparent placeholder:text-stone-300"
                placeholder="Аллергии, предпочтения..." />
            </div>

            <div>
              <label className="block font-montserrat text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-2">Пожелания молодожёнам</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3}
                className="w-full border-b border-stone-200 focus:border-red-400 outline-none py-2.5 font-cormorant text-xl text-stone-800 bg-transparent resize-none placeholder:text-stone-300"
                placeholder="Тёплые слова..." />
            </div>

            <button type="submit"
              className="w-full bg-red-700 text-white font-montserrat text-[11px] tracking-[0.3em] uppercase py-4 hover:bg-red-800 transition-colors duration-300">
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
    <section id="contacts" className="py-24 bg-white relative overflow-hidden">
      <CornerDecor pos="tl" />
      <CornerDecor pos="tr" />

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <div className="mb-14">
          <p className="font-montserrat text-[10px] tracking-[0.45em] uppercase text-red-400 mb-3">Есть вопросы?</p>
          <h2 className="font-cormorant text-5xl text-stone-800 font-light">Контакты</h2>
          <Divider />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-14">
          <div className="border border-stone-100 p-8 hover:border-red-200 transition-colors rounded-sm">
            <div className="text-3xl mb-4">🤵</div>
            <h3 className="font-cormorant text-3xl text-stone-800 font-light mb-1">Сергей</h3>
            <p className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-red-400 mb-4">Жених</p>
            <a href="tel:+7XXXXXXXXXX" className="flex items-center justify-center gap-2 font-montserrat text-sm text-stone-400 hover:text-red-600 transition-colors">
              <Icon name="Phone" size={13} /> +7 (XXX) XXX-XX-XX
            </a>
          </div>
          <div className="border border-stone-100 p-8 hover:border-red-200 transition-colors rounded-sm">
            <div className="text-3xl mb-4">👰</div>
            <h3 className="font-cormorant text-3xl text-stone-800 font-light mb-1">Анастасия</h3>
            <p className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-red-400 mb-4">Невеста</p>
            <a href="tel:+7XXXXXXXXXX" className="flex items-center justify-center gap-2 font-montserrat text-sm text-stone-400 hover:text-red-600 transition-colors">
              <Icon name="Phone" size={13} /> +7 (XXX) XXX-XX-XX
            </a>
          </div>
        </div>

        <Divider />
        <p className="font-cormorant italic text-2xl text-stone-400 mt-2 mb-1">«Любовь никогда не перестаёт»</p>
        <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-stone-300">07 · 08 · 2026</p>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
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
