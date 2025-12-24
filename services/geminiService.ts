export async function createExhibitionChat() {
  return {
    async sendMessage(message: string) {
      return {
        text: "AI is temporarily disabled. Deployment successful."
      };
    }
  };
}
