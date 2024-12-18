// get crime data
export async function GET(request: Request) {
    const res = await fetch('https://data.cityofnewyork.us/resource/bqiq-cu78.json');
    const data = await res.json();
    const crimeData = data.map((crime) => ({
        crime_year: crime.complaint_year_number,
        crime_month: crime.month_number,
        offensive_description: crime.offense_description,
        county_crime: crime.county,
        motive_crime: crime.bias_motive_description,
        offense_crime: crime.offense_category,
        arrest_date: crime.arrest_date
    }));
    return Response.json({ crimeData });
}