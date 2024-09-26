"use client"
import dynamic from 'next/dynamic';

const HotelForm = dynamic(() => import('../../../components/HotelForm'), { ssr: false });

const Create = () => {
  

  return (
    <div>
      <HotelForm isEditing={false} />
    </div>
  );
};

export default Create;
