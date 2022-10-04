const URI_API = "http://localhost:3030/api/teleco"

async function getInfoLabWifi() {
  const response = await fetch(`${URI_API}/wifi`);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  console.log(data);

  return data;
}

async function getInfoLabRadio() {
  const response = await fetch(`${URI_API}/radio`);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  console.log(data);

  return data;
}

export { getInfoLabWifi, getInfoLabRadio, URI_API };
