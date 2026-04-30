export default async function handler(req, res) {
  const q = req.query.q || "";

  if (q.length < 2) {
    return res.status(200).json([]);
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(q)}&include_adult=false&language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        accept: "application/json"
      }
    }
  );

  const data = await response.json();

  const results = data.results
    .filter(person => {
      return person.known_for &&
        person.known_for.some(item => item.original_language === "te");
    })
    .slice(0, 8)
    .map(person => person.name);

  res.status(200).json(results);
}