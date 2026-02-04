import { useQueries } from '@tanstack/react-query'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? ''

const fetchJson = async (path, options = {}) => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

const buildQuery = ({ queryKey, path, options }) => ({
  queryKey,
  queryFn: () => fetchJson(path, options),
})

export const useServerQueries = (queryDescriptors = []) =>
  useQueries({
    queries: queryDescriptors.map(buildQuery),
  })

export const useLandingPageQueries = () =>
  useQueries({
    queries: [
      buildQuery({ queryKey: ['services'], path: '/services' }),
      buildQuery({ queryKey: ['reviews'], path: '/reviews' }),
    ],
  })
