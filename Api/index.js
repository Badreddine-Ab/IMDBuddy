const url = "http://www.omdbapi.com/?i=tt3896198&apikey=f97b8e85"

export const fetchMovies = async (title) => {
    const res = await fetch(`${url}$s={title}`)
    const data = res.json();
    return data;
}