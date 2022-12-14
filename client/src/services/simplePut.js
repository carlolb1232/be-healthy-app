import axios from 'axios';

export async function simplePut(url, values) {
  try {
    const response = await axios.put(url, values);
    return response
  } catch (error) {
    return { error: `se ha producido un error: ${error}` }
  }
}