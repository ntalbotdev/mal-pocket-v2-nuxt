const api = 'https://api.jikan.moe/v4';

export async function fetchTodaySchedule() {
  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  
  const todayDate = new Date();
  const getToday = todayDate.getDay();
  
  const today = {
    name() {
      if (getToday === 0) { return dayNames[0] } // sunday
      if (getToday === 1) { return dayNames[1] } // monday
      if (getToday === 2) { return dayNames[2] } // tuesday
      if (getToday === 3) { return dayNames[3] } // wednesday
      if (getToday === 4) { return dayNames[4] } // thursday
      if (getToday === 5) { return dayNames[5] } // friday
      if (getToday === 6) { return dayNames[6] } // saturday
    }
  }

  try {
    const res = await fetch(`${api}/schedules?kids=false&filter=${today.name()}&sfw=true`);
    if (!res.ok) throw new Error('Failed to fetch today\'s schedule');
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchTopAiring(page: number = 1) {
  try {
    const res = await fetch(`${api}/top/anime?filter=airing&sfw=true&page=${page}`);
    if (!res.ok) throw new Error('Failed to fetch top airing anime');
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchSeasonalAnime(page: number = 1) {
  try {
    const res = await fetch(`${api}/seasons/now?sfw=true&page=${page}`);
    if (!res.ok) throw new Error('Failed to fetch seasonal anime');
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchUpcomingAnime(page: number = 1) {
  try {
    const res = await fetch(`${api}/seasons/upcoming?sfw=true&page=${page}`);
    if (!res.ok) throw new Error('Failed to fetch upcoming anime');
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
