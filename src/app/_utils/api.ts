function timeout(ms: number) {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), ms),
  )
}

export default async function fetchData<T>(
  endpoint: string,
  timeoutMs = 10000,
): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error('API URL is not defined in environment variables')
  }

  const fetchPromise = fetch(`${apiUrl}/${endpoint}`).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Fetching data from ${endpoint}: ${response.statusText}`)
    }
    return response.json()
  })

  return Promise.race([fetchPromise, timeout(timeoutMs)])
}
