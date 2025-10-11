import { config } from "dotenv";
config({ path: "./.env.local" });

import { momo } from "./lib/momo.ts";

const payload = {
  amount: "1000",
  currency: "EUR", // Confirmed for sandbox
  externalId: "123456",
  payer: { partyIdType: "MSISDN", partyId: "256777123456" }, // New test MSISDN
  payerMessage: "Payment for Instaskul",
  payeeNote: "Thank you",
};

async function testMoMo() {
  try {
    const referenceId = await momo.collections.requestToPay(payload);
    console.log("Reference ID:", referenceId);
    const status = await momo.collections.checkTransactionStatus(referenceId);
    console.log("Transaction Status:", status);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Test failed:", error.message);
    } else {
      console.error("Test failed:", error);
    }
  }
}

testMoMo();
