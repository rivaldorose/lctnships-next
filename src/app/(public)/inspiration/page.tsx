"use client"

import { useState } from "react"
import Image from "next/image"

const categories = [
  "All",
  "Photography",
  "Music Video",
  "Podcast",
  "Dance Film",
  "Creative",
]

const inspirationItems = [
  {
    id: 1,
    title: "Daylight Studio R'dam",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkJM0nM8EMuATWocuBf0WsETogWeCX4gEucUYCtvC8cbG7A_bV4sJi-Qeq-NrWKtEmGYvcj3zIz4h5ELnPaOf-V8aCblIj39vCaEhCOBx9r764o3P5_hk6GJ3vnaeO_aTwDohtfX4H-RTjPeMyqtM-eU96hj973Cm0_PM1vdnTGu8fLyLXhiUMiTxNFndbolDgAM6l-z_fRIJV01IDZWrVeFG-mOD0zRgCJD0zPCHMnerZjPDyHM-bvo9N19tc-8X4xyY6DOSeL9E",
    aspect: "portrait",
    category: "Photography",
  },
  {
    id: 2,
    title: "Industrial Loft AMS",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgDSUYhnyLvYtO37I6D0mJOltA4vz4F4IVKdY_weu1_apY6VmKBvGLB28FV4QHPXNHTO1m8fvt2_SsVzaxLfzG4Js9dT6VRE0Lx50bWpSjIk3OknvbvIPaDl_U2U8krsj1wqKj2lBRgIPWD5SClDfW7toHPQEud_0Rrk0gLinGcKXdPKCrvdIW7Is_AoEumSUK91spyT9JuRr_STAizvdZsGA1sAMXCp4cFkHeBEgyEWnDUIxyy-ndcLScxHK8NTkLBxUkTfCV_kM",
    aspect: "landscape",
    category: "Music Video",
  },
  {
    id: 3,
    title: "North Light Studio",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHRsIZ4_5SYZ3omO-aue8WH1wRXIDr3_Ovvg91AfwqYZUoBOz404CCEFuuiTpSSdepodX0pn_8ZocNar5eU4yJleUQlKRPOUpNnuzyHafJwQri_nBiIruccwn_q0xBtM4m-PSsiJeunEipXYXDzn0U2LvGL6AVXBr4e9pj2IuNsOHa76_4XdpaWPR7U7BI7TZnGXLhNfsT28leg2P2pCA7AzQKzJlSZV1xs8DUXEbgO-Hy84XpAGMwPbfwKMlkyak0KXBrLUiEils",
    aspect: "tall",
    category: "Podcast",
  },
  {
    id: 4,
    title: "Creative Space BER",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi0GNHFoMtzPl-NlK0mSsBcGHfbT4FX5zHivy6c6gDh9iY1lYkc7I1K57oJgPMYAWkb5JPPPgUDVUFfbjKj0czU_9ZDPb8d6CC6hee_KjHeg8_SMxizBPZcocyrevsm1wEV-uNZECGeh4Y3FU0oZP_HYr2NHpnimgLybMbQSic7qH0dvfq-bc33Y_2XV4VSl_N_EaFKWQLAHUjHWaSTUTfL5zpntZVayMiF6o2oyn921bUKJcogLLTn-Mk0uBHI5kQRHaWDBvx96c",
    aspect: "square",
    category: "Dance Film",
  },
  {
    id: 5,
    title: "Sound Booth NYC",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASxbv09_KoIRodsO9Paqx-KeC2PRwBSsXGFdWQJ_1_EBc0WULZ_oIf2dE6c8PBw6hQTNyEaBGdXldqh_EV3TdMlXb---pYhxhgQpG_uezcOGexA2xBScm8sfX9AJzXCvsf7dN64__GmHRd8bKfwoS9oKFwtVJX2_KLPFc7mICv7j4gIC717fdiIX3onD7LDjr5Y60lzHhPfPLnIoa7hYFa3iHrb3oP192YOaMf1xHhVGDKXjwEdkSN6VB9vc8d1uxGrbYYS5nef1E",
    aspect: "portrait",
    category: "Podcast",
  },
  {
    id: 6,
    title: "Motion Studio LDN",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXY6COp3fSKZVUb_7JkjP11zuSNVz6ofMcG2VjuRe-q_VUpk6DWDOvs5vk4hqbC82XZ3FNY5GbuaoH0bKozVrdHHWokz7CANSY2qicJRUm1w9tGL91wzcgkOxTM6JCGillVfYOtayVI5kddk8Q1s1a01RHeOi0a8eGGuguMrY0f3pgsjksOQQwnoRjwKSYyZ-7xjJjYq7_iLhqTsLkFJNInSDfd3W9v_blvoTLKwxr9qvJXNMrnEGZZTQ75JAUabPWaa7eBNl7O9c",
    aspect: "landscape",
    category: "Dance Film",
  },
  {
    id: 7,
    title: "Warehouse Studio PAR",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC0YDC-I_bcr2UpVmNBiYwYcuFZtMkmG-6zJnryR9bOCN1ml-w2BUmbYK2tOEHxRYxCPtVLvblgwN9MAtRaVnjE__qjdW3Uhw3FhVOBX7S5JbLMqbN0-jYPELyGPhRZgnktk4S3vvfNFLLg3BMip2TGASH0J12ng2Ahr3U5R8CV-BDo3s8JFi7ufBLkDTkVN-hnQ9bwpGL9N2hjK-8Rq7XhwU2ro-yhtemeiFfspU6_sn0qSqVJeHWzUAa_dKhjx9uHTIYNGGIMlE",
    aspect: "portrait",
    category: "Photography",
  },
  {
    id: 8,
    title: "Gallery Studio MIL",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA83Im-4yFt9KaHNM6lz5JeXp26Yrqn6lXcv84JfehmLg8di6oW-GNaTt7KN6eHLMbOE_tgkfQ78QeBZ5FA_ckEOsC9e_f88aL7RYwjEFAwD12wyQhtW7mPXTgX1CWG-tb2W8FBAOxPuuzfoejzTvCax9arwcDe-jsBDCByl21iAF0aCTQPWPcCjt2QECL9kJJDUtAAtuOeW84tJD3MqcKAEhLh7Vz1tq89Luv7J5d6nMyHAk4WCmePEKob6Azca1LoKMm5qTlnCu4",
    aspect: "tall",
    category: "Creative",
  },
  {
    id: 9,
    title: "Daylight Studio R'dam",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkJM0nM8EMuATWocuBf0WsETogWeCX4gEucUYCtvC8cbG7A_bV4sJi-Qeq-NrWKtEmGYvcj3zIz4h5ELnPaOf-V8aCblIj39vCaEhCOBx9r764o3P5_hk6GJ3vnaeO_aTwDohtfX4H-RTjPeMyqtM-eU96hj973Cm0_PM1vdnTGu8fLyLXhiUMiTxNFndbolDgAM6l-z_fRIJV01IDZWrVeFG-mOD0zRgCJD0zPCHMnerZjPDyHM-bvo9N19tc-8X4xyY6DOSeL9E",
    aspect: "square",
    category: "Music Video",
  },
  {
    id: 10,
    title: "Production Hub",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkJM0nM8EMuATWocuBf0WsETogWeCX4gEucUYCtvC8cbG7A_bV4sJi-Qeq-NrWKtEmGYvcj3zIz4h5ELnPaOf-V8aCblIj39vCaEhCOBx9r764o3P5_hk6GJ3vnaeO_aTwDohtfX4H-RTjPeMyqtM-eU96hj973Cm0_PM1vdnTGu8fLyLXhiUMiTxNFndbolDgAM6l-z_fRIJV01IDZWrVeFG-mOD0zRgCJD0zPCHMnerZjPDyHM-bvo9N19tc-8X4xyY6DOSeL9E",
    aspect: "portrait",
    category: "Creative",
  },
]

const aspectClasses = {
  portrait: "aspect-[2/3]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
  tall: "aspect-[1/2]",
}

export default function InspirationPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredItems = activeCategory === "All"
    ? inspirationItems
    : inspirationItems.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="relative w-full group">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            className="w-full h-12 pl-12 pr-4 bg-gray-100 dark:bg-white/5 border-none rounded-full focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-gray-500"
            placeholder="Search ideas..."
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center pb-8 overflow-x-auto">
        <div className="flex items-center gap-3 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${
                activeCategory === category
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="px-4 lg:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-5 max-w-[2000px] mx-auto pb-24">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-5 group relative rounded-[24px] overflow-hidden cursor-zoom-in"
            >
              <div className={`${aspectClasses[item.aspect as keyof typeof aspectClasses]} w-full relative`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-full flex items-center gap-1 hover:bg-red-700 transition-colors shadow-lg">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    Save
                  </button>
                </div>
                <div className="flex items-center justify-between text-white">
                  <p className="text-xs font-bold truncate pr-4">{item.title}</p>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-10 right-10 z-[100]">
        <button className="flex items-center justify-center rounded-full h-14 px-8 bg-black dark:bg-white text-white dark:text-black shadow-2xl hover:scale-105 active:scale-95 transition-all group gap-3 border border-white/10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-base font-bold">Share your work</span>
        </button>
      </div>
    </div>
  )
}
