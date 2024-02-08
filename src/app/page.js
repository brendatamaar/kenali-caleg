"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
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
  // useEffect(() => {
  //   const getData = async () => {
  //     const dataCaleg = await getCaleg();
  //     setCalegs(dataCaleg.data);
  //     setData(true);
  //   };
  //   getData();
  // }, []);

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
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
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
                className="my-5 px-5 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                key={idx}
              >
                <article className="overflow-hidden rounded-lg shadow-lg p-3">
                  <header className="flex items-center justify-start gap-4 leading-tight p-2 md:p-4">
                    <div className="w-1/4">
                      <img
                        alt="Placeholder"
                        className="block object-cover"
                        src={caleg.pasFoto}
                      />
                    </div>

                    <div className="w-3/4">
                      <h1 className="text-lg font-bold">
                        <a
                          className="no-underline hover:underline text-black"
                          href="#"
                        >
                          {caleg.nama}
                        </a>
                      </h1>
                      <p className="text-grey-darker text-sm">
                        Dapil: {caleg.namaDapil}
                      </p>
                      <p className="text-grey-darker text-sm">
                        Nama Partai: {caleg.namaPartai}
                      </p>
                      <p className="text-grey-darker text-sm">
                        Nomor Urut: {caleg.nomorUrut}
                      </p>
                    </div>
                  </header>

                  <div className="items-center justify-between leading-tight p-2 md:p-4">
                    <p className="text-sm">
                      Usia:{" "}
                      {caleg.usia === "" || caleg.usia === null
                        ? "Tidak Menyebutkan"
                        : caleg.usia + " Tahun"}
                    </p>
                    <p className="text-sm">
                      Jenis Kelamin: {caleg.jenisKelamin.toUpperCase()}
                    </p>
                    <p className="text-sm">
                      Status Hukum:{" "}
                      {caleg.statusHukum === "" || caleg.statusHukum === null
                        ? "Tidak Ada Data"
                        : caleg.statusHukum}
                    </p>
                    <p className="text-sm">
                      Status Disabilitas:{" "}
                      {caleg.statusDisabilitas === "" ||
                      caleg.statusDisabilitas === null
                        ? "Tidak Ada Data"
                        : caleg.statusDisabilitas}
                    </p>
                  </div>

                  <div className="items-center justify-between leading-tight p-2 md:p-4">
                    <p className="text-sm">
                      Pekerjaan:{" "}
                      {caleg.pekerjaan === "" || caleg.pekerjaan === null
                        ? "Tidak Ada Data"
                        : caleg.pekerjaan}
                    </p>

                    <p className="text-sm">
                      Riwayat Pekerjaan:
                      {caleg.riwayatPekerjaan === "" ||
                      caleg.riwayatPekerjaan === null
                        ? "Tidak Ada Data"
                        : caleg.riwayatPekerjaan.map((resume, idx) => (
                            <ul
                              key={idx}
                              className="list-disc px-2 py-1/2 md:px-4"
                            >
                              <li>
                                <b>{resume.namaPerusahaanLembaga}</b> -{" "}
                                {resume.jabatan} ({resume.tahunMasuk} -{" "}
                                {resume.tahunMasuk})
                              </li>
                            </ul>
                          ))}
                    </p>
                  </div>

                  <div className="items-center justify-between leading-tight p-2 md:p-4">
                    <p className="text-sm">
                      Program Usulan:{" "}
                      {caleg.programUsulan === "" ||
                      caleg.programUsulan === null
                        ? "Tidak Ada Data"
                        : caleg.programUsulan.slice(0, 3).map((program) => (
                            <ul className="list-disc px-2 py-1/2 md:px-4">
                              <li>
                                <b>{program.replace(/\n/, " ")}</b>
                              </li>
                            </ul>
                          ))}
                    </p>
                  </div>

                  <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                    {/* <a
                      className="flex items-center no-underline hover:underline text-black"
                      href="#"
                    > */}
                    <button
                      className="px-8 py-3 text-white bg-gray-300 rounded focus:outline-none"
                      disabled
                    >
                      Lihat Profil Lengkap
                    </button>
                  </footer>
                </article>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-16"> Data kosong. Silahkan pilih dapil anda. </div>
        )}
      </div>
    </main>
  );
}
