export async function getData() {
  const res = await fetch("https://caleg.zakiego.com/api/dpr-ri/dapil/3208");
  return res.json();
}
