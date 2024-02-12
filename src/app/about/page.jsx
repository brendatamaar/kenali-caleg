import Link from "next/link";

export default async function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-8 bg-gray-100">
      <header className="w-full text-white text-center">
        <nav className="px-4 bg-white shadow-md border-slate-500 dark:bg-[#0c1015] transition duration-700 ease-out">
          <div className="flex justify-between p-2">
            <div className="text-lg leading-[3rem] tracking-tight font-bold text-black dark:text-white">
              <Link href="/">KenaliCaleg</Link>
            </div>
            <div className="flex items-center space-x-4 text-sm text-white font-semibold tracking-tight">
              <Link href="/about">Tentang</Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="px-4">
        <h1 className="font-medium text-lg text-center">
          Selamat datang di KenaliCaleg
        </h1>
        <br />
        <p className="text-justify">
          Kenali para calon anggota legislatif DPR RI dari setiap partai politik
          peserta pemilu 2024 untuk dapil Jabodetabek. Data diambil dari Caleg API berdasarkan web KPU (
          <Link className="underline" href="https://infopemilu.kpu.go.id/">
            infopemilu.kpu.go.id
          </Link>
          ) dalam periode 13 Januari 2024 - 22 Januari 2024.
        </p>
        <br />
        <p className="text-justify">Tech Stack: Next.js, Tailwind</p>
      </div>

      <hr className="my-12" />
      <p className="fixed bottom-0 left-0 right-0 block border-t border-t-muted bg-white p-5 text-right text-sm text-muted-foreground print:hidden">
        &copy; 2024 -{" "}
        <a
          className="underline"
          href="https://brendatama.vercel.app"
          target="_blank"
        >
          Brendatama Akbar
        </a>
      </p>
    </main>
  );
}
