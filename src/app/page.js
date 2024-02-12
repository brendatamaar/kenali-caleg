"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
const options = [
  { value: "3101", label: "Jakarta Timur (JAKARTA I)" },
  {
    value: "3102",
    label: "Jakarta Pusat, Jakarta Selatan, Luar Negeri (JAKARTA II)",
  },
  {
    value: "3103",
    label: "Jakarta Barat, Jakarta Utara, Kep. Seribu (JAKARTA III)",
  },
  { value: "3203", label: "Kota Bogor (JAWA BARAT III)" },
  { value: "3205", label: "Kab. Bogor (JAWA BARAT V)" },
  { value: "3206", label: "Kota Bekasi & Kota Depok (JAWA BARAT VI)" },
  { value: "3207", label: "Kab. Bekasi (JAWA BARAT VII)" },
  { value: "3603", label: "Kota Tanggerang & Kab. Tanggerang (BANTEN III)" },
];

export default function Home() {
  const [calegs, setCalegs] = useState([]);
  const [isData, setData] = useState(false);
  const [searchValue, setSearchValue] = useState("3101");
  const router = useRouter();

  const getCaleg = async () => {
    try {
      const result = await axios(
        `https://caleg.zakiego.com/api/dpr-ri/dapil/${searchValue}`
      );

      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async () => {
    const dataCaleg = await getCaleg();
    dataCaleg.data.sort((a, b) => a.nomorUrut - b.nomorUrut);

    // Group the sorted response by 'namaPartai'
    const groupedData = dataCaleg.data.reduce((acc, current) => {
      const { namaPartai, ...rest } = current;
      (acc[namaPartai] = acc[namaPartai] || []).push(rest);
      return acc;
    }, {});
    console.log(groupedData);
    setCalegs(groupedData);
    setData(true);
  };

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

      <div className="container mb-12 mx-auto px-6">
        <div className="relative h-10 min-w-[200px] ">
          <select
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <center>
            <button
              onClick={handleChange}
              className="text-white w-32 mt-4 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Cari
            </button>
          </center>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Pilih Dapil Anda
          </label>
        </div>

        {isData ? (
          <div className="flex flex-wrap -mx-1 mt-20 lg:-mx-auto">
            {Object.entries(calegs).map(([namaPartai, caleg]) => (
              <div
                className="my-2 px-2 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 hover:bg-gray-100"
                key={namaPartai}
              >
                <div className="bg-white shadow-md border-b-2 overflow-hidden max-w-lg rounded-t-lg">
                  <div className="bg-white py-2 px-4">
                    <h2 className="text-md font-semibold text-gray-800">
                      {namaPartai}
                    </h2>
                  </div>
                </div>

                <ul className="divide-y divide-gray-200 bg-white rounded-b-lg">
                  {caleg.map((item) => (
                    <li
                      key={item.id}
                      className="md:flex md:items-start py-4 px-4"
                    >
                      <span className="text-gray-700 text-lg font-medium mr-4">
                        {item.nomorUrut}
                      </span>
                      <Image
                        width={100}
                        height={100}
                        alt="Placeholder"
                        className="w-36 h-64 lg:w-24 lg:h-32 rounded-lg object-cover mx-auto mb-2"
                        src={item.pasFoto}
                      />
                      <div className="flex-col gap-2">
                        <h3 className="text-sm font-medium text-gray-800 text-wrap">
                          {item.nama}
                        </h3>
                        <p className="text-gray-600 text-sm text-wrap">
                          {item.pekerjaan === "" || item.pekerjaan === null
                            ? ""
                            : item.pekerjaan}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {item.usia === "" || item.usia === null
                            ? "Tidak Ada Data Usia"
                            : item.usia + " Tahun"}
                        </p>
                        <div className="text-gray-600 text-sm mt-2">
                          {item.riwayatPendidikan &&
                            item.riwayatPendidikan.length > 0 && (
                              <div>
                                <p>
                                  Pendidikan Terakhir:{" "}
                                  {
                                    item.riwayatPendidikan[
                                      item.riwayatPendidikan.length - 1
                                    ].jenjangPendidikan
                                  }
                                </p>

                                <p>
                                  {" "}
                                  {
                                    item.riwayatPendidikan[
                                      item.riwayatPendidikan.length - 1
                                    ].namaInstitusi
                                  }
                                </p>
                              </div>
                            )}
                        </div>
                        <div className="text-gray-600 text-sm mt-2">
                          {item.statusHukum === "" ||
                          item.statusHukum === null ? (
                            ""
                          ) : (
                            <span className="bg-gray-100 w-full text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {item.statusHukum}
                            </span>
                          )}
                        </div>
                        {item.statusDisabilitas === "" ||
                        item.statusDisabilitas === null ? (
                          ""
                        ) : (
                          <span className="bg-gray-100 w-full text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {item.statusDisabilitas}
                          </span>
                        )}

                        <button
                          onClick={() => router.push(`/detail/${item.id}`)}
                          className="text-white w-auto bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mt-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Lihat Profil Lengkap
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-16">Data kosong. Silahkan pilih dapil anda.</div>
        )}
      </div>

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
