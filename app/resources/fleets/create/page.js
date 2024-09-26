"use client"
import dynamic from 'next/dynamic';

const FleetForm = dynamic(() => import('../../../components/FleetForm'), { ssr: false });

const Create = () => {
  

  return (
    <div>
      <FleetForm isEditing={false} />
    </div>
  );
};

export default Create;
