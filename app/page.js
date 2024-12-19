'use client'; // Indique que ce fichier fonctionne côté client

import { useEffect, useState } from 'react';
import OffenseCrimesPieChart from './components/PieChartCrimes/OffenseCrimesPieChart';

export default function HomePage() {
  return (
    <div>
      <h1>Liste des Crimes</h1>
      <OffenseCrimesPieChart />
    </div>
  );
}
