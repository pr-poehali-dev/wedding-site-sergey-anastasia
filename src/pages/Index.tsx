import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const WEDDING_DATE = new Date('2026-08-07T12:40:00');

const WREATH_IMG = 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/d4c9a012-34a5-4661-a231-99766b1a6922.jpg';
const CORNER_IMG = 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/0a4d06cd-8b53-4b74-ab89-f9055b7cb766.jpg';
const DIVIDER_IMG = 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/38f4d646-8651-4781-b969-add0fcc1f80a.jpg';
const COUPLE_IMG = 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/f09bf319-dfd4-444a-a1c3-d01ae5fc3c9a.jpg';
const FLORAL_BG = 'https://cdn.poehali.dev/projects/0142fc86-07ad-444d-a33f-86ee9a4768a2/files/33acd17e-f7fd-44d7-ba87-4762efad7e26.jpg';

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

function FloralSection({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <section id={id} className="relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img src={FLORAL_BG} alt="" className="w-full h-full object-cover opacity-40" />
      </div>
      <div className="relative z-10 py-20 px-4">
        {children}
      </div>
    </section>
  );
}

function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-3 ${className}`}>
      <img src={DIVIDER_IMG} alt="" className="w-48 md:w-64" style={{ mixBlendMode: 'multiply' }} />
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

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-center mb-6">
      <h2 className="font-cormorant italic text-5xl text-black font-light">{title}</h2>
      <Divider />
    </div>
  );
}

function Schedule() {
  const items = [
    {
      time: '12:40', date: '07.08.2026',
      title: 'Торжественная роспись',
      subtitle: 'ЗАГС',
      desc: 'Приглашаем вас разделить вместе с нами радость создания новой семьи.',
      place: 'ЗАГС',
      address: 'Улица Рихарда Зорге, 48, Курган, Центральный район',
      mapsUrl: 'https://yandex.ru/maps/?text=Курган,+улица+Рихарда+Зорге,+48',
    },
    {
      time: '17:00', date: '07.08.2026',
      title: 'Торжество',
      subtitle: 'Банкетный зал «Август»',
      desc: 'Именно здесь мы отметим наш незабываемый день.',
      place: 'Банкетный зал «Август»',
      address: 'Комсомольская улица, 31, рп. Варгаши, Курганская область',
      mapsUrl: 'https://yandex.ru/maps/?text=Варгаши,+Комсомольская+улица,+31',
    },
  ];
  return (
    <FloralSection id="schedule">
      <div className="max-w-xl mx-auto">
        <SectionHeader title="Свадебное расписание" />
        <div className="space-y-0">
          {items.map((item, i) => (
            <div key={i}>
              <div className="flex gap-5 py-6">
                <div className="flex-shrink-0 w-24 text-left">
                  <p className="font-montserrat text-sm font-semibold text-black">{item.time}</p>
                  <p className="font-montserrat text-xs text-black">{item.date}</p>
                </div>
                <div className="flex-1">
                  <h3 className="font-cormorant text-2xl text-black font-medium mb-0.5">{item.title}</h3>
                  <p className="font-montserrat text-sm text-black mb-2">{item.subtitle}</p>
                  <p className="font-montserrat text-sm text-black/70 italic leading-relaxed mb-4">{item.desc}</p>
                  <div className="bg-white/60 backdrop-blur-sm rounded-sm p-4 space-y-1">
                    <p className="font-cormorant text-xl text-black font-medium">{item.place}</p>
                    <p className="font-montserrat text-sm text-black">{item.address}</p>
                    <a href={item.mapsUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-montserrat text-[11px] tracking-wider uppercase text-[#7a2535] hover:text-[#5e1c28] mt-2 transition-colors">
                      <Icon name="Navigation" size={11} /> Маршрут
                    </a>
                  </div>
                </div>
              </div>
              {i < items.length - 1 && <div className="h-px bg-black/10 mx-2" />}
            </div>
          ))}
        </div>
      </div>
    </FloralSection>
  );
}

function Venue() {
  return (
    <FloralSection id="venue">
      <div className="max-w-xl mx-auto">
        <SectionHeader title="Место проведения" />
        <div className="space-y-6 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-sm p-6">
            <p className="font-montserrat text-xs font-semibold text-black mb-1">12:40 — ЗАГС</p>
            <p className="font-cormorant text-2xl text-black font-medium mb-1">Дворец бракосочетания</p>
            <div className="flex items-start gap-2 mb-3">
              <Icon name="MapPin" size={13} className="text-[#7a2535] mt-0.5 flex-shrink-0" />
              <p className="font-montserrat text-sm text-black">г. Курган, ул. Рихарда Зорге, 48</p>
            </div>
            <div className="flex items-start gap-2 mb-4">
              <Icon name="Clock" size={13} className="text-[#7a2535] mt-0.5 flex-shrink-0" />
              <p className="font-montserrat text-sm text-black">Просим прибыть к 12:20</p>
            </div>
            <div className="h-44 overflow-hidden rounded-sm mb-3">
              <iframe title="ЗАГС" src="https://yandex.ru/map-widget/v1/?text=Курган%2C+улица+Рихарда+Зорге%2C+48&z=16&l=map" width="100%" height="100%" frameBorder="0" allowFullScreen style={{ border: 0 }} />
            </div>
            <a href="https://yandex.ru/maps/?text=Курган,+улица+Рихарда+Зорге,+48" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-montserrat text-[11px] tracking-wider uppercase text-[#7a2535] hover:text-[#5e1c28] transition-colors">
              <Icon name="Navigation" size={11} /> Построить маршрут
            </a>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-sm p-6">
            <p className="font-montserrat text-xs font-semibold text-black mb-1">17:00 — Торжество</p>
            <p className="font-cormorant text-2xl text-black font-medium mb-1">Кафе «Август»</p>
            <div className="flex items-start gap-2 mb-3">
              <Icon name="MapPin" size={13} className="text-[#7a2535] mt-0.5 flex-shrink-0" />
              <p className="font-montserrat text-sm text-black">р.п. Варгаши, Комсомольская ул., 31</p>
            </div>
            <div className="flex items-start gap-2 mb-4">
              <Icon name="Clock" size={13} className="text-[#7a2535] mt-0.5 flex-shrink-0" />
              <p className="font-montserrat text-sm text-black">Банкет, танцы и торжество</p>
            </div>
            <div className="h-44 overflow-hidden rounded-sm mb-3">
              <iframe title="Кафе Август" src="https://yandex.ru/map-widget/v1/?text=Варгаши%2C+Комсомольская+улица%2C+31&z=16&l=map" width="100%" height="100%" frameBorder="0" allowFullScreen style={{ border: 0 }} />
            </div>
            <a href="https://yandex.ru/maps/?text=Варгаши,+Комсомольская+улица,+31" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-montserrat text-[11px] tracking-wider uppercase text-[#7a2535] hover:text-[#5e1c28] transition-colors">
              <Icon name="Navigation" size={11} /> Построить маршрут
            </a>
          </div>
        </div>
      </div>
    </FloralSection>
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
    <FloralSection id="gallery">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title="Фото" />
        <p className="font-montserrat text-sm text-black text-center -mt-3 mb-8">
          Скидывайте свои фотографии, сделанные на нашем торжестве, в общий чат, чтобы все гости могли ими полюбоваться :)
        </p>
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
        <p className="font-montserrat text-xs text-black/50 text-center mt-5 tracking-widest uppercase">Все фотографии появятся после свадьбы</p>
      </div>
    </FloralSection>
  );
}

function RSVP() {
  const [form, setForm] = useState({ name: '', attending: 'yes', guests: '1', dietary: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  return (
    <FloralSection id="rsvp">
      <div className="max-w-lg mx-auto">
        <SectionHeader title="Пожелания по подаркам" />
        <div className="bg-white/60 backdrop-blur-sm rounded-sm p-6 mb-8 text-center space-y-3">
          <p className="font-montserrat text-sm text-black leading-relaxed">
            Ваше присутствие в день нашей свадьбы — самый значимый подарок для нас!
          </p>
          <p className="font-montserrat text-sm text-black leading-relaxed">
            Мы понимаем, что дарить цветы на свадьбу — это традиция, но мы не сможем насладиться их красотой в полной мере...
          </p>
          <p className="font-montserrat text-sm text-black leading-relaxed">
            Будем рады любой другой альтернативе (денежный эквивалент или др.)
          </p>
        </div>

        <h3 className="font-cormorant italic text-3xl text-black text-center mb-2">Примечание</h3>
        <h3 className="font-cormorant italic text-3xl text-black text-center mb-4">Подтверждение</h3>
        <Divider />
        <p className="font-montserrat text-sm text-black text-center mb-8">
          Пожалуйста подтвердите своё присутствие до 07.07.2026
        </p>

        {submitted ? (
          <div className="text-center py-10">
            <img src={WREATH_IMG} alt="" className="w-40 mx-auto mb-6 opacity-80" style={{ mixBlendMode: 'multiply' }} />
            <h3 className="font-cormorant italic text-4xl text-black mb-2">Ждём Вас!</h3>
            <p className="font-montserrat text-sm text-black">Мы с нетерпением ждём встречи с вами</p>
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-sm rounded-sm p-6">
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
              <div>
                <label className="block font-montserrat text-xs text-black mb-2">Ваше имя *</label>
                <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border-b border-black/20 focus:border-[#7a2535] outline-none py-2 font-cormorant text-xl text-black bg-transparent transition-colors placeholder:text-black/30"
                  placeholder="Имя Фамилия" />
              </div>
              <div>
                <label className="block font-montserrat text-xs text-black mb-3">Вы придёте?</label>
                <div className="flex gap-3">
                  {[{ v: 'yes', l: 'Буду!' }, { v: 'no', l: 'Не смогу' }].map(({ v, l }) => (
                    <button key={v} type="button" onClick={() => setForm({ ...form, attending: v })}
                      className={`flex-1 py-3 font-montserrat text-[11px] tracking-wider uppercase border transition-all duration-300 ${
                        form.attending === v
                          ? v === 'yes' ? 'bg-[#7a2535] text-white border-[#7a2535]' : 'bg-stone-700 text-white border-stone-700'
                          : 'bg-transparent text-black border-black/20 hover:border-black/50'
                      }`}>{l}</button>
                  ))}
                </div>
              </div>
              {form.attending === 'yes' && (
                <div>
                  <label className="block font-montserrat text-xs text-black mb-2">Количество гостей</label>
                  <select value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })}
                    className="w-full border-b border-black/20 focus:border-[#7a2535] outline-none py-2 font-cormorant text-xl text-black bg-transparent">
                    {['1', '2', '3', '4', '5+'].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label className="block font-montserrat text-xs text-black mb-2">Пожелания к меню</label>
                <input type="text" value={form.dietary} onChange={e => setForm({ ...form, dietary: e.target.value })}
                  className="w-full border-b border-black/20 focus:border-[#7a2535] outline-none py-2 font-cormorant text-xl text-black bg-transparent placeholder:text-black/30"
                  placeholder="Аллергии, предпочтения..." />
              </div>
              <div>
                <label className="block font-montserrat text-xs text-black mb-2">Пожелания молодожёнам</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3}
                  className="w-full border-b border-black/20 focus:border-[#7a2535] outline-none py-2 font-cormorant text-xl text-black bg-transparent resize-none placeholder:text-black/30"
                  placeholder="Тёплые слова..." />
              </div>
              <button type="submit"
                className="w-full bg-[#3d2020] text-white font-montserrat text-sm tracking-widest py-4 hover:bg-[#5e1c28] transition-colors duration-300 flex items-center justify-center gap-2">
                <Icon name="Check" size={16} /> Подтвердить
              </button>
            </form>
          </div>
        )}
      </div>
    </FloralSection>
  );
}

function Contacts() {
  return (
    <FloralSection id="contacts">
      <div className="max-w-xl mx-auto text-center">
        <SectionHeader title="Контакты" />
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <div className="bg-white/60 backdrop-blur-sm rounded-sm p-7">
            <div className="text-3xl mb-3">🤵</div>
            <h3 className="font-cormorant text-3xl text-black font-light mb-1">Сергей</h3>
            <p className="font-montserrat text-xs tracking-widest uppercase text-[#7a2535] mb-4">Жених</p>
            <a href="tel:+7XXXXXXXXXX" className="inline-flex items-center justify-center gap-2 font-montserrat text-sm text-black hover:text-[#7a2535] transition-colors">
              <Icon name="Phone" size={13} /> +7 (XXX) XXX-XX-XX
            </a>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-sm p-7">
            <div className="text-3xl mb-3">👰</div>
            <h3 className="font-cormorant text-3xl text-black font-light mb-1">Анастасия</h3>
            <p className="font-montserrat text-xs tracking-widest uppercase text-[#7a2535] mb-4">Невеста</p>
            <a href="tel:+7XXXXXXXXXX" className="inline-flex items-center justify-center gap-2 font-montserrat text-sm text-black hover:text-[#7a2535] transition-colors">
              <Icon name="Phone" size={13} /> +7 (XXX) XXX-XX-XX
            </a>
          </div>
        </div>
        <Divider />
        <p className="font-cormorant italic text-2xl text-black mt-2 mb-2">«Любовь никогда не перестаёт»</p>
        <p className="font-montserrat text-[10px] tracking-[0.45em] uppercase text-black/40">07 · 08 · 2026</p>
      </div>
    </FloralSection>
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