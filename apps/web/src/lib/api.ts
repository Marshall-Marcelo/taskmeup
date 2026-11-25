const baseUrl = import.meta.env.VITE_API_URL;

class ApiService {
  protected async handleFetch<T>(
    endpoint: string,
    options: RequestInit,
  ): Promise<T> {
    try {
      const request = () =>
        fetch(`http://localhost:5000${endpoint}`, {
          credentials: 'include',
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

      let response = await request();

      if (response.status === 401) {
        await this.refreshAccessToken();
        response = await request();
      }

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
    const response = await fetch(`http://localhost:5000/auth/refresh`, {
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
