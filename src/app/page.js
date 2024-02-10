"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

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
    setCalegs(dataCaleg.data);
    setData(true);

    console.log(searchValue);
    console.log(dataCaleg.data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 bg-gray-100">
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="relative h-10 min-w-[200px]">
          <select
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
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
          <div className="flex flex-wrap -mx-1 mt-20 lg:-mx-4">
            {calegs.map((caleg, idx) => (
              <div
                className="my-2 px-2 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 hover:bg-gray-100"
                key={idx}
              >
                <div className="flex flex-col items-center bg-white rounded-lg shadow md:max-w-xl">
                  <Image
                    width={100}
                    height={100}
                    alt="Placeholder"
                    className="object-cover md:mt-4 w-full h-96 md:h-auto md:w-48"
                    src={caleg.pasFoto}
                  />
                  <div className="w-full max-w-sm p-4 bg-white sm:p-6">
                    <div className="text-sm grid gap-2 font-normal text-gray-500 dark:text-gray-400">
                      <div className="flex items-center px-1 py-3 text-md font-bold text-gray-900 rounded-lg bg-gray-100 hover:bg-gray-100 group hover:shadow">
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          {caleg.nama}
                        </span>
                      </div>
                      <div className="flex items-center px-1 py-3 text-md font-bold text-gray-900 rounded-lg bg-gray-100 hover:bg-gray-100 group hover:shadow">
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          {caleg.namaDapil}
                        </span>
                      </div>
                      <div className="flex items-center px-1 py-3 text-md font-bold text-gray-900 rounded-lg bg-gray-100 hover:bg-gray-100 group hover:shadow">
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          {caleg.namaPartai}
                        </span>
                      </div>
                      <div className="flex items-center px-1 py-3 text-md font-bold text-gray-900 rounded-lg bg-gray-100 hover:bg-gray-100 group hover:shadow">
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Nomor Urut: {caleg.nomorUrut}
                        </span>
                      </div>
                    </div>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <ul className="my-4 space-y-3">
                      <li>
                        <div className="inline-flex items-center w-full p-3 rounded-lg text-sm font-medium border border-gray-500 text-black">
                          <span className="flex-1 whitespace-nowrap me-2">Usia</span>
                          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {caleg.usia === "" || caleg.usia === null
                              ? "Tidak Menyebutkan"
                              : caleg.usia + " Tahun"}
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="inline-flex items-center w-full p-3 rounded-lg text-sm font-medium border border-gray-500 text-black">
                          <span className="flex-1 whitespace-nowrap me-2 ">
                            Jenis Kelamin
                          </span>
                          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {caleg.jenisKelamin.toUpperCase()}
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="inline-flex items-center w-full p-3 rounded-lg text-sm font-medium border border-gray-500 text-black">
                          <span className="flex-1 whitespace-nowrap me-2 ">
                            Status Hukum
                          </span>
                          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {caleg.statusHukum === "" ||
                            caleg.statusHukum === null
                              ? "Tidak Ada Data"
                              : caleg.statusHukum}
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="inline-flex items-center w-full p-3 rounded-lg text-sm font-medium border border-gray-500 text-black">
                          <span className="flex-1 whitespace-nowrap me-2 ">
                            Status Disabilitas
                          </span>
                          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {caleg.statusDisabilitas === "" ||
                            caleg.statusDisabilitas === null
                              ? "Tidak Ada Data"
                              : caleg.statusDisabilitas}
                          </span>
                        </div>
                      </li>
                    </ul>
                    <button
                      onClick={() => router.push(`/detail/${caleg.id}`)}
                      className="text-white w-auto bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Lihat Profil Lengkap
                    </button>
                  </div>
                </div>
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
