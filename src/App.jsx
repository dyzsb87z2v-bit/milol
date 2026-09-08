const sections = [
  { id: 'about', title: 'درباره ما', text: 'اینجا چند خط درباره پروژه یا کسب‌وکار شما قرار می‌گیرد.' },
  { id: 'services', title: 'خدمات', text: 'لیست خدمات یا محصولاتی که ارائه می‌دهید.' },
  { id: 'contact', title: 'تماس', text: 'راه‌های ارتباطی: ایمیل، تلفن، شبکه‌های اجتماعی.' },
]

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800">
        <nav className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-xl font-extrabold tracking-tight">Milol</a>
          <ul className="flex gap-6 text-sm text-slate-300">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:text-white transition-colors">{s.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
            به وب‌سایت جدید خوش آمدید
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
            این یک صفحه شروع است. محتوا، رنگ‌ها و بخش‌ها را می‌توان به‌راحتی تغییر داد.
          </p>
          <a
            href="#contact"
            className="mt-10 inline-block rounded-full bg-indigo-500 px-8 py-3 font-semibold hover:bg-indigo-400 transition-colors"
          >
            شروع کنید
          </a>
        </section>

        {sections.map((s) => (
          <section key={s.id} id={s.id} className="mx-auto max-w-5xl px-6 py-16 border-t border-slate-800">
            <h2 className="text-2xl font-bold">{s.title}</h2>
            <p className="mt-4 text-slate-400">{s.text}</p>
          </section>
        ))}
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Milol
      </footer>
    </div>
  )
}
