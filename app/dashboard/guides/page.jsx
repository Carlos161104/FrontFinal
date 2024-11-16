"use client";
import { useState } from "react";
import FormNewGuide from "./_components/FormNewGuide";
import InventoryList from "./_components/InventoryList";

const page = () => {
  const [flag, setFlag] = useState(false)
  const [guideId, setGuideId] = useState(0)
  return (
    <div className=" m-20 h-4/6 overflow-y-auto">
      <FormNewGuide setFlag={setFlag} setGuideId={setGuideId}/>
      <InventoryList guideId={guideId} flag={flag}/>
    </div>
  );
};

export default page;
