'use client';

import StackedAreaChartCrimes from './components/StackedAreaCharts/StackedAreaChartCrimes';
import OffenseCrimesPieChart from './components/PieChartCrimes/OffenseCrimesPieChart';
import CrimeMap from './components/CrimesMaps/CrimesMaps';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-16">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          NYPD HATES CRIMES
        </h1>
      </header>

      <main className="space-y-12">
        {/* Graphique des catégories de crimes */}
        <section className="bg-white shadow rounded-lg p-6">
          
          <div className="overflow-auto">
            <OffenseCrimesPieChart />
          </div>
        </section>
        <br/>
        {/* Graphique des crimes par biais raciaux */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Graphique des Crimes par Biais Raciaux
          </h2>
          <div className="overflow-auto">
            <StackedAreaChartCrimes />
          </div>
        </section>

        <section className="bg-white shadow rounded-lg p-6">
          <br/>
          <div className="overflow-auto">
            <CrimeMap/>
          </div>
        </section>

      </main>
    </div>
  );
}
