// src/lib/Fetcher.ts
const fetcher = (url: string) =>
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed with status: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        console.error("Fetcher Error:", err);
        throw err;
      });
  
  export default fetcher;