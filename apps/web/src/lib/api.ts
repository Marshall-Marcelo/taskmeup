const baseUrl = import.meta.env.VITE_API_URL;

class ApiService {
  protected async handleFetch<T>(
    endpoint: string,
    options: RequestInit,
  ): Promise<T> {
    try {
      const request = () =>
        fetch(`http://localhost:5000${endpoint}`, {
          ...options,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

      const response = await request();

      // if (response.status === 401) {
      //   // Add refresh access token logic here
      //   response = await request();
      // }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server', { cause: error });
      }

      throw error;
    }
  }

  private async refreshAccessToken() {
    const response = await fetch(``, {
      credentials: 'include',
      method: 'POST',
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
  }
}

export { ApiService };
