"use client";
import { API_URL } from "@/constants";
import React, { useEffect, useState } from "react";
import SerachBar from "./_components/SerachBar";
import GuideCard from "./_components/GuideCard";
import Link from "next/link";

const layoutGuides = ({ children }) => {
  const [listGuide, setListGuide] = useState([]);
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch(`${API_URL}/guides`);
        const data = await response.json();
        setListGuide(data);
        setGuides(data);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };

    fetchGuides();
  }, []);

  useEffect(() => {
    console.log(listGuide);
  }, [listGuide]);
  return (
    <div className="flex flex-row h-full">
      <div className="w-4/12 h-[90vh] max-h-[90vh] overflow-hidden p-5 overflow-y-auto bg-blue-400">
        <h1 className="text-center text-3xl">Guias de envio</h1>
        <SerachBar setListGuides={setListGuide} guides={guides} />
        {listGuide.map((guide) => (
          <Link
            key={guide.id}
            href={{ pathname: `/dashboard/guides/${guide.id}` }}
            className="block"
          >
            <GuideCard key={guide.id} guide={guide} />
          </Link>
        ))}
      </div>
      <div className="bg-blue-300 h-full w-8/12">{children}</div>
    </div>
  );
};

export default layoutGuides;
