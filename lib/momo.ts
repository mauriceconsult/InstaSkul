import { config } from "dotenv";
config({ path: "./.env.local" });

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const momo = {
  collections: {
    async getAccessToken() {
      const {
        MOMO_TARGET_ENVIRONMENT,
        MOMO_PRIMARY_KEY,
        MOMOUSER_ID,
        MOMOUSER_SECRET,
      } = process.env;
      if (
        !MOMO_TARGET_ENVIRONMENT ||
        !MOMO_PRIMARY_KEY ||
        !MOMOUSER_ID ||
        !MOMOUSER_SECRET
      ) {
        throw new Error("Missing MTN MoMo environment variables");
      }

      const authToken = Buffer.from(
        `${MOMOUSER_ID}:${MOMOUSER_SECRET}`
      ).toString("base64");
      try {
        const response = await axios.post(
          `${MOMO_TARGET_ENVIRONMENT}/collection/token/`,
          {},
          {
            headers: {
              "Ocp-Apim-Subscription-Key": MOMO_PRIMARY_KEY,
              Authorization: `Basic ${authToken}`,
            },
          }
        );
        console.log("Token Response:", response.data);
        return response.data.access_token;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Token Error:", {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers,
          });
          throw new Error(
            `Token Request failed: ${error.message} - ${JSON.stringify(
              error.response?.data
            )}`
          );
        }
        throw new Error("Token Request failed: Unknown error");
      }
    },

    async requestToPay(payload: {
      amount: string;
      currency: string;
      externalId: string;
      payer: { partyIdType: string; partyId: string };
      payerMessage: string;
      payeeNote: string;
    }) {
      const { MOMO_TARGET_ENVIRONMENT, MOMO_PRIMARY_KEY } = process.env;
      if (!MOMO_TARGET_ENVIRONMENT || !MOMO_PRIMARY_KEY) {
        throw new Error("Missing MTN MoMo environment variables");
      }

      const accessToken = await this.getAccessToken();
      const referenceId = uuidv4(); // Generate unique X-Reference-Id
      console.log("Access Token:", accessToken);
      console.log("Generated X-Reference-Id:", referenceId);
      console.log(
        "Request URL:",
        `${MOMO_TARGET_ENVIRONMENT}/collection/v1_0/requesttopay`
      );
      console.log("Headers:", {
        "X-Reference-Id": referenceId,
        "X-Target-Environment": "sandbox",
        "Ocp-Apim-Subscription-Key": MOMO_PRIMARY_KEY,
        Authorization: `Bearer ${accessToken}`,
      });
      console.log("Payload:", payload);

      try {
        const response = await axios.post(
          `${MOMO_TARGET_ENVIRONMENT}/collection/v1_0/requesttopay`,
          payload,
          {
            headers: {
              "X-Reference-Id": referenceId,
              "X-Target-Environment": "sandbox",
              "Ocp-Apim-Subscription-Key": MOMO_PRIMARY_KEY,
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Full Response:", response);
        return referenceId; // Return the generated X-Reference-Id
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error Response:", {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers,
          });
          throw new Error(
            `Request to Pay failed: ${error.message} - ${JSON.stringify(
              error.response?.data
            )}`
          );
        }
        throw new Error("Request to Pay failed: Unknown error");
      }
    },

    async checkTransactionStatus(referenceId: string) {
      const { MOMO_TARGET_ENVIRONMENT, MOMO_PRIMARY_KEY } = process.env;
      if (!MOMO_TARGET_ENVIRONMENT || !MOMO_PRIMARY_KEY) {
        throw new Error("Missing MTN MoMo environment variables");
      }

      const accessToken = await this.getAccessToken();
      try {
        const response = await axios.get(
          `${MOMO_TARGET_ENVIRONMENT}/collection/v1_0/requesttopay/${referenceId}`,
          {
            headers: {
              "X-Target-Environment": "sandbox",
              "Ocp-Apim-Subscription-Key": MOMO_PRIMARY_KEY,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Transaction Status Response:", response.data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error Response:", {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers,
          });
          throw new Error(
            `Check Transaction Status failed: ${
              error.message
            } - ${JSON.stringify(error.response?.data)}`
          );
        }
        throw new Error("Check Transaction Status failed: Unknown error");
      }
    },
  },
};

export { momo };
