"use client";
import { useState, useEffect } from 'react';
import {getDayTourActivities, getDayTourActivityById, updateDayTourActivity, deleteDayTourActivity} from '../../services/api';
import KanbanBoard from '../../components/KanbanBoard';

export default function Create() {  

  return (
    <div>
        <KanbanBoard/>
    </div>
  );
}
