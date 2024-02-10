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
      {calegs.map((caleg, idx) => (
        <div className="max-w-lg mx-4 my-10 w-full" key={idx}>
          <button
            onClick={() => router.push(`/`)}
            className="text-white w-32 mt-4 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Kembali
          </button>
          <div className=" bg-white rounded-lg shadow-md p-5" key={idx}>
            <Image
              width={128}
              height={128}
              alt="Placeholder"
              className="rounded-xl mx-auto"
              src={caleg.pasFoto}
            />
            <h2 className="text-center text-2xl font-semibold mt-3">
              {caleg.nama.toUpperCase()}
            </h2>
            <p className="text-center text-gray-600">
              {" "}
              {caleg.namaPartai} - No. Urut {caleg.nomorUrut}
            </p>
            <div className="flex justify-center mt-5">
              <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {caleg.usia === "" || caleg.usia === null
                  ? "Tidak Menyebutkan Usia"
                  : caleg.usia + " Tahun"}
              </span>
              <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {caleg.jenisKelamin.toUpperCase()}
              </span>
            </div>
            <div className="mt-5">
              <h3 className="text-xl font-semibold">Status Hukum</h3>
              <p className="text-gray-600 mt-2">
                {caleg.statusHukum === "" || caleg.statusHukum === null
                  ? "-"
                  : caleg.statusHukum}
              </p>
            </div>
            <div className="mt-5">
              <h3 className="text-xl font-semibold">Status Disabilitas</h3>
              <p className="text-gray-600 mt-2">
                {caleg.statusDisabilitas === "" ||
                caleg.statusDisabilitas === null
                  ? "-"
                  : caleg.statusDisabilitas}
              </p>
            </div>
          </div>

          <div className=" bg-white rounded-lg shadow-md mt-4 p-5" key={idx}>
            <h3 className="text-xl font-semibold">Pekerjaan</h3>
            <p className="text-gray-600 mt-2">
              {caleg.pekerjaan === "" || caleg.pekerjaan === null
                ? "Tidak Ada Data"
                : caleg.pekerjaan}
            </p>
          </div>

          <div className=" bg-white rounded-lg shadow-md mt-4 p-5" key={idx}>
            <h3 className="text-xl font-semibold">Riwayat Pekerjaan</h3>
            <p className="text-gray-600 mt-2">
              {caleg.riwayatPekerjaan === "" || caleg.riwayatPekerjaan === null
                ? "Tidak Ada Data"
                : caleg.riwayatPekerjaan.map((resume, idx) => (
                    <ul key={idx} className="list-disc px-2 py-1/2 md:px-4">
                      <li>
                        <b>{resume.namaPerusahaanLembaga}</b> - {resume.jabatan}{" "}
                        ({resume.tahunMasuk} - {resume.tahunMasuk})
                      </li>
                    </ul>
                  ))}
            </p>
          </div>

          <div className=" bg-white rounded-lg shadow-md mt-4 p-5" key={idx}>
            <h3 className="text-xl font-semibold">Riwayat Pendidikan</h3>
            <p className="text-gray-600 mt-2">
              {caleg.riwayatPendidikan === "" ||
              caleg.riwayatPendidikan === null
                ? "Tidak Ada Data"
                : caleg.riwayatPendidikan.map((pendidikan, idx) => (
                    <ul key={idx} className="list-disc px-2 py-1/2 md:px-4">
                      <li>
                        <b>{pendidikan.jenjangPendidikan}</b> -{" "}
                        {pendidikan.namaInstitusi} ({pendidikan.tahunMasuk} -{" "}
                        {pendidikan.tahunMasuk})
                      </li>
                    </ul>
                  ))}
            </p>
          </div>

          <div className=" bg-white rounded-lg shadow-md mt-4 p-5" key={idx}>
            <h3 className="text-xl font-semibold">Riwayat Organisasi</h3>
            <p className="text-gray-600 mt-2">
              {caleg.riwayatOrganisasi === "" ||
              caleg.riwayatOrganisasi === null
                ? "Tidak Ada Data"
                : caleg.riwayatOrganisasi.map((organisasi, idx) => (
                    <ul key={idx} className="list-disc px-2 py-1/2 md:px-4">
                      <li>
                        <b>{organisasi.namaOrganisasi}</b> -{" "}
                        {organisasi.jabatan} ({organisasi.tahunMasuk} -{" "}
                        {organisasi.tahunMasuk})
                      </li>
                    </ul>
                  ))}
            </p>
          </div>

          <div className=" bg-white rounded-lg shadow-md mt-4 p-5" key={idx}>
            <h3 className="text-xl font-semibold">Program Usulan</h3>
            <p className="text-gray-600 mt-2">
              {caleg.programUsulan === "" || caleg.programUsulan === null
                ? "Tidak Ada Data"
                : caleg.programUsulan.slice(0, 3).map((program, idx) => (
                    <ul className="list-disc px-2 py-1/2 md:px-4" key={idx}>
                      <li>
                        <b>{program}</b>
                      </li>
                    </ul>
                  ))}
            </p>
          </div>

          <div
            className=" bg-white rounded-lg shadow-md mt-4 mb-12 p-5"
            key={idx}
          >
            <h3 className="text-xl font-semibold">Motivasi</h3>
            <p className="text-gray-600 mt-2">
              {caleg.motivasi === "" || caleg.motivasi === null
                ? "Tidak Ada Data"
                : caleg.motivasi.slice(0, 3).map((motivasi, idx) => (
                    <ul className="list-disc px-2 py-1/2 md:px-4" key={idx}>
                      <li>
                        <b>{motivasi}</b>
                      </li>
                    </ul>
                  ))}
            </p>
          </div>
        </div>
      ))}
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
