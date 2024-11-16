"use client";
import { useEffect, useState } from "react";
import CardGuideId from "./_components/CardGuideId";
import { API_URL } from "@/constants";
import { Button } from "@nextui-org/react";
import { LuPen, LuTruck } from "react-icons/lu";
import DeleteGuide from "@/actions/guide/DeleteGuide";
import ModalGuidesUpdate from "./_components/ModalGuidesUpdate";
import FormUpdateGuide from "./_components/FormUpdateGuide";

const page = ({ params }) => {
  const [guide, setGuide] = useState({});
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState([]);

  useEffect(() => {
    const fetchDate = async () => {
      setLoading(true);
      const nuwParams = await params;

      const data = await fetch(`${API_URL}/guides/${nuwParams.id}`);
      const response = await data.json();
      setGuide(response);
      setLoading(false);
    };
    fetchDate();
  }, [params]);

  if (loading) {
    return <div>Cargando...</div>;
  }
  const handleDelete = async () => {
    await DeleteGuide(guide.id, track);
  };
  return (
    <div>
      <CardGuideId guide={guide} track={track} setTrack={setTrack} />
      <div className="flex flex-row m-10 px-5 justify-center">
        <ModalGuidesUpdate>
            <FormUpdateGuide guide={guide}/>
        </ModalGuidesUpdate>
        <Button
          className="p-3 bg-green-500 rounded-lg mx-5"
          onClick={handleDelete}
        >
          <LuTruck className="text-3xl" />
        </Button>
      </div>
    </div>
  );
};

export default page;
