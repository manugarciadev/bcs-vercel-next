"use client"
import dynamic from 'next/dynamic';

const ProductForm = dynamic(() => import('../../components/ProductForm'), { ssr: false });

const Create = () => {
  

  return (
    <div>
      <ProductForm isEditing={false} />
    </div>
  );
};

export default Create;
