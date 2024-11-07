// composables/useRefreshLogin.js
import { ref } from "vue";

export function useRefreshLogin() {
  const isRefreshing = ref(false);

  const refreshLogin = async () => {
    isRefreshing.value = true;
    const now = new Date();
    const currentTime = now.getTime();
    const expiryTime = localStorage.getItem("expirytime");

    if (currentTime > expiryTime) {
      const refreshToken = localStorage.getItem("refresh");
      const url = localStorage.getItem("url");
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const body = `client_id=ANDR&grant_type=refresh_token&refresh_token=${refreshToken}`;

      try {
        const response = await fetch(`${url}api/login/`, {
          method: "POST",
          headers: headers,
          body: body,
        });

        if (!response.ok) {
          alert(
            "Login failure. Refresh token expired? Go to the Account page to refresh your login.",
          );
          return;
        }

        const responseJson = await response.json();
        const token = responseJson.access_token;
        const newRefreshToken = responseJson.refresh_token;

        if (!token.startsWith("undef")) {
          localStorage.setItem("expirytime", currentTime);
          localStorage.setItem("token", token);
          localStorage.setItem("refresh", newRefreshToken);
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }
    isRefreshing.value = false;
  };

  return { isRefreshing, refreshLogin };
}
