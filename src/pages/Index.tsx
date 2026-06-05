import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const WEDDING_DATE = new Date('2026-08-07T12:40:00');

const WREATH_IMG = 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/d4c9a012-34a5-4661-a231-99766b1a6922.jpg';
const CORNER_IMG = 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/0a4d06cd-8b53-4b74-ab89-f9055b7cb766.jpg';
const DIVIDER_IMG = 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/38f4d646-8651-4781-b969-add0fcc1f80a.jpg';
const COUPLE_IMG = 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/f09bf319-dfd4-444a-a1c3-d01ae5fc3c9a.jpg';

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
  const style: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0, transform: 'none' },
    tr: { top: 0, right: 0, transform: 'scaleX(-1)' },
    bl: { bottom: 0, left: 0, transform: 'scaleY(-1)' },
    br: { bottom: 0, right: 0, transform: 'scale(-1)' },
  };
  return (
    <img src={CORNER_IMG} alt="" className="absolute w-40 md:w-52 pointer-events-none select-none opacity-90"
      style={{ ...style[pos], mixBlendMode: 'multiply', position: 'absolute' }} />
  );
}

function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-4 ${className}`}>
      <img src={DIVIDER_IMG} alt="" className="w-56 md:w-72 opacity-85" style={{ mixBlendMode: 'multiply' }} />
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/96 backdrop-blur-md shadow-sm py-3 border-b border-stone-100' : 'bg-transparent py-5'}`}>
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <span className="font-cormorant text-stone-700 text-lg font-light tracking-[0.3em] italic">С & А</span>
        <ul className="hidden md:flex gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="font-montserrat text-[11px] tracking-[0.25em] uppercase text-stone-500 hover:text-[#7a2535] transition-colors duration-300">{l.label}</a>
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
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden py-20">
      {/* Венок + текст как открытка */}
      {/* Венок фиксированного размера, текст строго внутри овала */}
      <div className="relative flex items-center justify-center mx-auto" style={{ width: 520, height: 580 }}>
        <img
          src={WREATH_IMG}
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
          style={{ mixBlendMode: 'multiply' }}
        />
        {/* Текстовый блок вписан в овальную область венка */}
        <div className="relative z-10 text-center flex flex-col items-center justify-center" style={{ width: 260, marginTop: 10 }}>
          <p className="font-montserrat text-[9px] tracking-[0.45em] uppercase text-stone-500 mb-3 leading-loose">
            Вместе&nbsp;и&nbsp;навсегда
          </p>
          <h1 className="font-cormorant text-6xl text-stone-900 font-light leading-none">
            Сергей
          </h1>
          <p className="font-cormorant italic text-3xl text-[#7a2535] my-2">and</p>
          <h1 className="font-cormorant text-6xl text-stone-900 font-light leading-none mb-5">
            Анастасия
          </h1>
          <p className="font-montserrat text-[9px] tracking-[0.4em] uppercase text-stone-600 mb-1">
            Приглашаем на свадьбу
          </p>
          <p className="font-cormorant text-3xl text-stone-900 font-light mb-0.5">7 августа 2026</p>
          <p className="font-montserrat text-[9px] tracking-[0.35em] uppercase text-stone-500 mb-4">
            Пятница, 12:40
          </p>
          <p className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-stone-500 leading-loose mb-4">
            Будем счастливы<br />разделить этот день<br />с вами
          </p>
          <p className="font-cormorant italic text-2xl text-stone-600">Ждём вас</p>
        </div>
      </div>

      {/* Обратный отсчёт */}
      <div className="flex flex-col items-center gap-5 mt-8 z-10">
        <div className="flex gap-4 md:gap-6">
          {[{ val: days, label: 'дней' }, { val: hours, label: 'часов' }, { val: minutes, label: 'минут' }, { val: seconds, label: 'секунд' }].map(({ val, label }) => (
            <div key={label} className="text-center">
              <div className="border border-stone-200 bg-white px-3 md:px-5 py-2 min-w-[56px] md:min-w-[68px]">
                <div className="font-cormorant text-2xl md:text-3xl text-stone-700 font-light">{String(val).padStart(2, '0')}</div>
              </div>
              <p className="font-montserrat text-[8px] tracking-[0.25em] uppercase text-stone-400 mt-1.5">{label}</p>
            </div>
          ))}
        </div>
        <a href="#rsvp" className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-white bg-[#7a2535] px-8 py-3 hover:bg-[#5e1c28] transition-colors duration-300">
          Подтвердить присутствие
        </a>
      </div>
    </section>
  );
}

function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="text-center mb-4">
      <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-[#7a2535] mb-3">{tag}</p>
      <h2 className="font-cormorant text-5xl text-stone-800 font-light">{title}</h2>
      <Divider />
    </div>
  );
}

function Schedule() {
  const items = [
    { time: '12:40', icon: '💍', title: 'Регистрация в ЗАГС', desc: 'Торжественная церемония бракосочетания. Просим прибыть к 12:20.' },
    { time: '14:00', icon: '📸', title: 'Фотосессия', desc: 'Прогулка и создание воспоминаний на всю жизнь.' },
    { time: '17:00', icon: '🥂', title: 'Начало торжества', desc: 'Праздничный банкет, поздравления, танцы и веселье!' },
  ];
  return (
    <section id="schedule" className="py-24 bg-[#faf8f5] relative overflow-hidden">
      <CornerDecor pos="tl" />
      <CornerDecor pos="br" />
      <div className="max-w-xl mx-auto px-6 relative z-10">
        <SectionHeader tag="7 августа 2026" title="График дня" />
        <div>
          {items.map((item, i) => (
            <div key={i}>
              <div className="flex gap-6 py-7">
                <div className="text-right w-20 flex-shrink-0 pt-1">
                  <span className="font-cormorant text-2xl text-[#7a2535] font-light">{item.time}</span>
                </div>
                <div className="w-px bg-stone-200 flex-shrink-0 relative">
                  <div className="absolute top-1.5 -left-[6px] w-3 h-3 rounded-full border-2 border-[#9b3a4a] bg-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{item.icon}</span>
                    <h3 className="font-cormorant text-2xl text-stone-800 font-medium">{item.title}</h3>
                  </div>
                  <p className="font-montserrat text-sm text-stone-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
              {i < items.length - 1 && <div className="h-px bg-stone-100" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section id="venue" className="py-24 bg-white relative overflow-hidden">
      <CornerDecor pos="tr" />
      <CornerDecor pos="bl" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionHeader tag="Где нас найти" title="Место проведения" />
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="border border-stone-100 p-8 hover:border-[#c4a0a8] transition-colors duration-300">
            <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-[#7a2535] mb-2">12:40</p>
            <h3 className="font-cormorant text-3xl text-stone-800 font-light mb-4">Дворец бракосочетания</h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={13} className="text-[#9b3a4a] mt-0.5 flex-shrink-0" />
                <p className="font-montserrat text-sm text-stone-500 font-light">г. Курган, ул. Рихарда Зорге, 48</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Clock" size={13} className="text-[#9b3a4a] mt-0.5 flex-shrink-0" />
                <p className="font-montserrat text-sm text-stone-500 font-light">Просим прибыть к 12:20</p>
              </div>
            </div>
            <a href="https://yandex.ru/maps/?text=Курган,+улица+Рихарда+Зорге,+48" target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-montserrat text-[10px] tracking-[0.3em] uppercase text-[#7a2535] hover:text-[#5e1c28] transition-colors">
              <Icon name="Navigation" size={11} /> Построить маршрут
            </a>
          </div>
          <div className="border border-stone-100 p-8 hover:border-[#c4a0a8] transition-colors duration-300">
            <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-[#7a2535] mb-2">17:00</p>
            <h3 className="font-cormorant text-3xl text-stone-800 font-light mb-4">Кафе «Август»</h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={13} className="text-[#9b3a4a] mt-0.5 flex-shrink-0" />
                <p className="font-montserrat text-sm text-stone-500 font-light">р.п. Варгаши, Комсомольская ул., 31</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Clock" size={13} className="text-[#9b3a4a] mt-0.5 flex-shrink-0" />
                <p className="font-montserrat text-sm text-stone-500 font-light">Банкет, танцы и торжество</p>
              </div>
            </div>
            <a href="https://yandex.ru/maps/?text=Варгаши,+Комсомольская+улица,+31" target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-montserrat text-[10px] tracking-[0.3em] uppercase text-[#7a2535] hover:text-[#5e1c28] transition-colors">
              <Icon name="Navigation" size={11} /> Построить маршрут
            </a>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="overflow-hidden border border-stone-100 h-52">
            <iframe title="ЗАГС" src="https://yandex.ru/map-widget/v1/?text=Курган%2C+улица+Рихарда+Зорге%2C+48&z=16&l=map" width="100%" height="100%" frameBorder="0" allowFullScreen style={{ border: 0 }} />
          </div>
          <div className="overflow-hidden border border-stone-100 h-52">
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
    <section id="gallery" className="py-24 bg-[#faf8f5] relative overflow-hidden">
      <CornerDecor pos="tl" />
      <CornerDecor pos="br" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionHeader tag="Наши моменты" title="Фотогалерея" />
        <p className="font-cormorant italic text-lg text-stone-400 text-center -mt-4 mb-8">Здесь появятся ваши совместные фотографии</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[180px]">
          {photos.map((p, i) => (
            <div key={i} className={`${p.cls} overflow-hidden group cursor-pointer`}>
              <div className="relative w-full h-full">
                <img src={p.src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
        <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-stone-300 text-center mt-6">Все фотографии появятся после свадьбы</p>
      </div>
    </section>
  );
}

function RSVP() {
  const [form, setForm] = useState({ name: '', attending: 'yes', guests: '1', dietary: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="rsvp" className="py-24 bg-white relative overflow-hidden">
      <CornerDecor pos="tr" />
      <CornerDecor pos="bl" />
      <div className="max-w-lg mx-auto px-6 relative z-10">
        <SectionHeader tag="Ждём вас!" title="Подтверждение" />
        <p className="font-cormorant italic text-lg text-stone-400 text-center -mt-4 mb-10">Сообщите о присутствии до 1 июля 2026</p>
        {submitted ? (
          <div className="text-center py-12">
            <img src={WREATH_IMG} alt="" className="w-40 mx-auto mb-6 opacity-80" style={{ mixBlendMode: 'multiply' }} />
            <h3 className="font-cormorant text-4xl text-stone-800 font-light mb-3">Спасибо!</h3>
            <p className="font-montserrat text-sm text-stone-400 tracking-wide">Мы с нетерпением ждём встречи с вами</p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-7">
            <div>
              <label className="block font-montserrat text-[10px] tracking-[0.35em] uppercase text-stone-400 mb-2">Ваше имя *</label>
              <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border-b border-stone-200 focus:border-[#9b3a4a] outline-none py-2.5 font-cormorant text-xl text-stone-800 bg-transparent transition-colors placeholder:text-stone-300"
                placeholder="Имя Фамилия" />
            </div>
            <div>
              <label className="block font-montserrat text-[10px] tracking-[0.35em] uppercase text-stone-400 mb-3">Вы придёте? *</label>
              <div className="flex gap-3">
                {[{ v: 'yes', l: 'Буду!' }, { v: 'no', l: 'Не смогу' }].map(({ v, l }) => (
                  <button key={v} type="button" onClick={() => setForm({ ...form, attending: v })}
                    className={`flex-1 py-3 font-montserrat text-[11px] tracking-[0.2em] uppercase border transition-all duration-300 ${
                      form.attending === v
                        ? v === 'yes' ? 'bg-[#7a2535] text-white border-[#7a2535]' : 'bg-stone-700 text-white border-stone-700'
                        : 'bg-transparent text-stone-500 border-stone-200 hover:border-stone-400'
                    }`}>{l}</button>
                ))}
              </div>
            </div>
            {form.attending === 'yes' && (
              <div>
                <label className="block font-montserrat text-[10px] tracking-[0.35em] uppercase text-stone-400 mb-2">Количество гостей</label>
                <select value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })}
                  className="w-full border-b border-stone-200 focus:border-[#9b3a4a] outline-none py-2.5 font-cormorant text-xl text-stone-800 bg-transparent">
                  {['1', '2', '3', '4', '5+'].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="block font-montserrat text-[10px] tracking-[0.35em] uppercase text-stone-400 mb-2">Пожелания к меню</label>
              <input type="text" value={form.dietary} onChange={e => setForm({ ...form, dietary: e.target.value })}
                className="w-full border-b border-stone-200 focus:border-[#9b3a4a] outline-none py-2.5 font-cormorant text-xl text-stone-800 bg-transparent placeholder:text-stone-300"
                placeholder="Аллергии, предпочтения..." />
            </div>
            <div>
              <label className="block font-montserrat text-[10px] tracking-[0.35em] uppercase text-stone-400 mb-2">Пожелания молодожёнам</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3}
                className="w-full border-b border-stone-200 focus:border-[#9b3a4a] outline-none py-2.5 font-cormorant text-xl text-stone-800 bg-transparent resize-none placeholder:text-stone-300"
                placeholder="Тёплые слова..." />
            </div>
            <button type="submit" className="w-full bg-[#7a2535] text-white font-montserrat text-[11px] tracking-[0.3em] uppercase py-4 hover:bg-[#5e1c28] transition-colors duration-300">
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
    <section id="contacts" className="py-24 bg-[#faf8f5] relative overflow-hidden">
      <CornerDecor pos="tl" />
      <CornerDecor pos="tr" />
      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <SectionHeader tag="Есть вопросы?" title="Контакты" />
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border border-stone-100 p-8 hover:border-[#c4a0a8] transition-colors duration-300">
            <div className="text-3xl mb-4">🤵</div>
            <h3 className="font-cormorant text-3xl text-stone-800 font-light mb-1">Сергей</h3>
            <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-[#7a2535] mb-4">Жених</p>
            <a href="tel:+7XXXXXXXXXX" className="inline-flex items-center justify-center gap-2 font-montserrat text-sm text-stone-400 hover:text-[#7a2535] transition-colors">
              <Icon name="Phone" size={13} /> +7 (XXX) XXX-XX-XX
            </a>
          </div>
          <div className="bg-white border border-stone-100 p-8 hover:border-[#c4a0a8] transition-colors duration-300">
            <div className="text-3xl mb-4">👰</div>
            <h3 className="font-cormorant text-3xl text-stone-800 font-light mb-1">Анастасия</h3>
            <p className="font-montserrat text-[10px] tracking-[0.35em] uppercase text-[#7a2535] mb-4">Невеста</p>
            <a href="tel:+7XXXXXXXXXX" className="inline-flex items-center justify-center gap-2 font-montserrat text-sm text-stone-400 hover:text-[#7a2535] transition-colors">
              <Icon name="Phone" size={13} /> +7 (XXX) XXX-XX-XX
            </a>
          </div>
        </div>
        <Divider />
        <p className="font-cormorant italic text-2xl text-stone-400 mt-2 mb-2">«Любовь никогда не перестаёт»</p>
        <p className="font-montserrat text-[10px] tracking-[0.45em] uppercase text-stone-300">07 · 08 · 2026</p>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
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