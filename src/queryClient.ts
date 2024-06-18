import { QueryClient } from 'react-query';

// Create a new QueryClient instance with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,  // Disable automatic retries on query failure
      refetchOnWindowFocus: false,  // Disable refetching data when the window gains focus
    },
  },
});
