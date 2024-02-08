"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

function Page({ params }) {
  const [calegs, setCalegs] = useState([]);
  const [isData, setData] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const dataCaleg = await getCaleg(params);
      setCalegs(dataCaleg.data);
      setData(true);
    };
    getData();
  }, []);

  const getCaleg = async () => {
    try {
      const result = await axios(
        `https://caleg.zakiego.com/api/dpr-ri/calon/${params.dapil}/${params.partai}/${params.no}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-50">
      <div className="container my-5 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          <div className="my-5 w-full bg-white">
            {calegs.map((caleg, idx) => (
              <article className="overflow-hidden rounded-lg shadow-lg p-3" key={idx}>
                <header className="flex items-center justify-start gap-4 leading-tight p-2 md:p-4">
                  <div className="w-1/6">
                    <Image
                      width={120}
                      height={120}
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
                    Riwayat Pendidikan:{" "}
                    {caleg.riwayatPendidikan === "" ||
                    caleg.riwayatPendidikan === null
                      ? "Tidak Ada Data"
                      : caleg.riwayatPendidikan.map((pendidikan, idx) => (
                          <ul
                            key={idx}
                            className="list-disc px-2 py-1/2 md:px-4"
                          >
                            <li>
                              <b>{pendidikan.jenjangPendidikan}</b> -{" "}
                              {pendidikan.namaInstitusi} (
                              {pendidikan.tahunMasuk} - {pendidikan.tahunMasuk})
                            </li>
                          </ul>
                        ))}
                  </p>
                  <br />
                  <p className="text-sm">
                    Riwayat Pekerjaan:{" "}
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
                  <br />
                  <p className="text-sm">
                    Riwayat Organisasi:{" "}
                    {caleg.riwayatOrganisasi === "" ||
                    caleg.riwayatOrganisasi === null
                      ? "Tidak Ada Data"
                      : caleg.riwayatOrganisasi.map((organisasi, idx) => (
                          <ul
                            key={idx}
                            className="list-disc px-2 py-1/2 md:px-4"
                          >
                            <li>
                              <b>{organisasi.namaOrganisasi}</b> -{" "}
                              {organisasi.jabatan} ({organisasi.tahunMasuk} -{" "}
                              {organisasi.tahunMasuk})
                            </li>
                          </ul>
                        ))}
                  </p>
                </div>

                <div className="items-center justify-between leading-tight p-2 md:p-4">
                  <p className="text-sm">
                    Program Usulan:{" "}
                    {caleg.programUsulan === "" || caleg.programUsulan === null
                      ? "Tidak Ada Data"
                      : caleg.programUsulan.slice(0, 3).map((program, idx) => (
                          <ul
                            className="list-disc px-2 py-1/2 md:px-4"
                            key={idx}
                          >
                            <li>
                              <b>{program}</b>
                            </li>
                          </ul>
                        ))}
                  </p>
                </div>

                <div className="items-center justify-between leading-tight p-2 md:p-4">
                  <p className="text-sm">
                    Motivasi:{" "}
                    {caleg.motivasi === "" || caleg.motivasi === null
                      ? "Tidak Ada Data"
                      : caleg.motivasi.slice(0, 3).map((motivasi, idx) => (
                          <ul
                            className="list-disc px-2 py-1/2 md:px-4"
                            key={idx}
                          >
                            <li>
                              <b>{motivasi}</b>
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
                    onClick={() => router.push(`/`)}
                    className="text-white w-32 mt-4 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Kembali
                  </button>
                </footer>
              </article>
            ))}
          </div>
        </div>
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

export default Page;
