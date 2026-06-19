// Define the type of data you expect from the API
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Dummy API URL
const apiUrl: string = 'https://jsonplaceholder.typicode.com/posts/1';

// Function to fetch data
async function fetchPost(): Promise<void> {
  try {
    const response: Response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data: Post = await response.json();
    console.log('Fetched data:', data);

  } catch (error) {
    if (error instanceof Error) {
      console.error('Fetch error:', error.message);
    }
  }
}

// Call the function
fetchPost();
