import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../utils'

/**
 * Fetches user info and displays their profile
 * @param {String} username name of the user to be displayed
 */
async function getUser (username) {
  const { data } = await axiosInstance.get(`/users/${username}`)
  return data
}

export const useUser = username => {
  const { data, isPending, error } = useQuery({
    queryKey: ['user', username],
    queryFn: () => getUser(username)
  })
  let friendlyError = ''
  if (error) {
    if (error.status === 404) {
      friendlyError = 'No results'
    } else if (error.status === 403) {
      friendlyError = `Limit reached. Try later`
    } else {
      friendlyError = error.message
    }
  }
  return { data, isPending, error, friendlyError }
}
