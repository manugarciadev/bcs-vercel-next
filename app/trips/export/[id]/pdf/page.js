"use client"
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import {getDayTourActivities, getTripById, getDayTourActivityById, updateDayTourActivity, deleteDayTourActivity} from '../../../../services/api';
import ProtectedCodeRoute from '../../../../components/ProtectedCodeRoute';



const PdfPage = () => {
  const pathname = usePathname();
  //const { id } = router.query; // Obtém o ID do produto da URL, se disponível
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(null);
  //const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();



  return (
    <div>
            <h1>PDF Page</h1>
    </div>
  );
};

export default PdfPage;
