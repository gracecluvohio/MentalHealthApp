export default class API {
  static HOST = "http://server.tristanphan.com:5001";

  static async sendChatMessage(
    username: string,
    date: Date,
    user_audio_url?: string,
    text?: string
  ): Promise<object> {
    if (user_audio_url == null && text == null) {
      throw new Error("Either user_audio_url or text must be provided");
    }
    const url = new URL(`${API.HOST}/send_chat_message`);

    // Set up the query parameters
    url.searchParams.append("username", username);
    url.searchParams.append("date", date.toISOString());
    if (user_audio_url != null)
      url.searchParams.append("user_audio_url", user_audio_url);
    if (text != null) url.searchParams.append("text", text);

    try {
      const response = await fetch(url.toString());

      if (!response.ok) throw new Error("Call to /send_chat_message failed");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async setMood(
    username: string,
    date: Date,
    mood: number
  ): Promise<object> {
    const url = new URL(`${API.HOST}/set_mood`);

    // Set up the query parameters
    url.searchParams.append("username", username);
    url.searchParams.append("date", date.toISOString());
    url.searchParams.append("mood", mood.toString());

    try {
      const response = await fetch(url.toString());

      if (!response.ok) throw new Error("Call to /set_mood failed");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getSessionHistory(username: string): Promise<object> {
    const url = new URL(`${API.HOST}/get_session_history`);

    // Set up the query parameters
    url.searchParams.append("username", username);

    try {
      const response = await fetch(url.toString());

      if (!response.ok) throw new Error("Call to /get_session_history failed");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
